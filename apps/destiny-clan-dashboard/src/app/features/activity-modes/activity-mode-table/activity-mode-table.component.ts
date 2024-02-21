import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeasonService } from '@core/services/season.service';
import { DataSource, Filterer, Sorter, SorterMetadata, Viewer, ViewerMetadata } from '@destiny-clan-dashboard/components';
import { BungieDateTimePipe, PlaytimePipe } from '@destiny-clan-dashboard/components/pipes';
import { DestinyDefinitionsDestinyActivityModeDefinition } from 'bungie-api-angular';
import { TrackedDuration } from 'libs/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.serializer';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { ActivityModeService } from '../data-access/activity-mode.service';
import { ProfileRecentActivity } from '../models/ProfileActivityMode';
import { ACTIVITY_MODE_FILTERER_METADATA } from './activity-mode-metadata/ActivityModeFilterer';
import { ACTIVITY_MODE_SORTER_METADATA } from './activity-mode-metadata/ActivityModeSorter';
import { ActivityModeViewContext, ACTIVITY_MODE_VIEWER_METADATA } from './activity-mode-metadata/ActivityModeViewer';

@Component({
  selector: 'app-activity-mode-table',
  templateUrl: './activity-mode-table.component.html',
  styleUrls: ['./activity-mode-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityModeTableComponent implements OnChanges {
  @Input() title: string;
  @Input() mode: DestinyDefinitionsDestinyActivityModeDefinition;

  private readonly today = new Date();
  trackedDates: TrackedDuration[];
  isLoading = true;
  activityViewer: Viewer;
  activityFilterer = new Filterer({ metadata: ACTIVITY_MODE_FILTERER_METADATA });
  activitySorter;
  activityInfo$: Observable<DataSource>;

  constructor(
    private activitiesService: ActivityModeService,
    private route: ActivatedRoute,
    private seasonService: SeasonService,
    private playtimePipe: PlaytimePipe,
    private bungieDateTimePipe: BungieDateTimePipe
  ) {
    const currentSeason = this.seasonService.currentSeason;
    const previousSeason = this.seasonService.getPreviousSeason();
    this.trackedDates = [
      {
        id: 'lastWeek',
        description: 'Last Week',
        startDate: new Date(new Date().setDate(this.today.getDate() - 7)),
        endDate: this.today
      },
      {
        id: 'lastMonth',
        description: 'Last Month',
        startDate: new Date(new Date().setDate(this.today.getDate() - 30)),
        endDate: this.today
      },
      {
        id: 'lastNinetyDays',
        description: 'Last 90 Days',
        startDate: new Date(new Date().setDate(this.today.getDate() - 90)),
        endDate: this.today
      },

      {
        id: 'currentSeason',
        description: 'Current Season',
        startDate: new Date(currentSeason.startDate),
        endDate: new Date(currentSeason.endDate)
      },
      {
        id: 'lastSeason',
        description: 'Last Season',
        startDate: new Date(previousSeason.startDate),
        endDate: new Date(previousSeason.endDate)
      }
    ];
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['mode']) {
      const initialViewerData = new Map(ACTIVITY_MODE_VIEWER_METADATA);
      const initialSorterData = new Map(ACTIVITY_MODE_SORTER_METADATA);

      this.trackedDates.forEach((td) => {
        initialViewerData.set(td.id, this.createViewer(td));
        initialSorterData.set(td.id, this.createSorter(td));
      });

      this.activityViewer = new Viewer({
        metadata: initialViewerData,
        contextProvider: this.createViewContextProvider()
      });

      this.activitySorter = new Sorter({ metadata: initialSorterData });

      //if (this.mode && this.mode.modeType) {
      //console.log('trying');
      this.activityInfo$ = this.activitiesService.getAllActivitiesByMode(this.mode.modeType, this.trackedDates).pipe(
        map((ds) => {
          return new DataSource<any>({ data: ds });
        }),
        tap((x) => {
          this.isLoading = false;
        })
      );
      //}
    }
  }

  createViewer(definition: TrackedDuration): ViewerMetadata<ProfileRecentActivity, ActivityModeViewContext> {
    return {
      label: definition.description,
      plainText: (item: ProfileRecentActivity, context: ActivityModeViewContext) =>
        `${context.playTimePipe.transform(item.stats.trackedDates[definition.id])}`,
      render: (item: ProfileRecentActivity, context: ActivityModeViewContext) => {
        return {
          // classList: 'text-center',
          text: context.playTimePipe.transform(item.stats.trackedDates[definition.id])
          //text: item.stats.trackedDates[definition.id].toString()
        };
      }
    };
  }
  createSorter(definition: TrackedDuration): SorterMetadata<ProfileRecentActivity> {
    return {
      label: definition.description,
      comparator: (a: ProfileRecentActivity, b: ProfileRecentActivity) => {
        return (a.stats.trackedDates[definition.id] || 0) - (b.stats.trackedDates[definition.id] || 0);
      }
    };
  }

  createViewContextProvider() {
    return of((item: any) => ({
      item,
      playTimePipe: this.playtimePipe,
      dateTimePipe: this.bungieDateTimePipe
    }));
  }
}