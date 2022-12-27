import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource, Filterer, Sorter, SorterMetadata, Viewer, ViewerMetadata } from '@destiny/components';
import { MetricDefinition } from '@destiny/data/models';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { map, Observable, of, tap } from 'rxjs';
import { ActivitiesService } from '../data-access/activities.service';
import { ACTIVITY_FILTERER_METADATA } from './activity-table-metadata/ActivityTableFilterer';
import { ACTIVITY_SORTER_METADATA } from './activity-table-metadata/ActivityTableSorter';
import { ACTIVITY_VIEWER_METADATA } from './activity-table-metadata/ActivityTableViewer';
interface ViewContext {
  item: ClanMemberProfile;
}
@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityTableComponent implements OnChanges {
  @Input() title: string;
  @Input() metricDefinitions: MetricDefinition[];

  isLoading = true;
  activityViewer: Viewer;
  activityFilterer = new Filterer({ metadata: ACTIVITY_FILTERER_METADATA });
  activitySorter
  activityInfo$: Observable<DataSource>;

  constructor(private activitiesService: ActivitiesService, private route: ActivatedRoute) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['metricDefinitions']) {
      // Set Viewer
      const initialViewerData = new Map(ACTIVITY_VIEWER_METADATA);
      const initialSorterData = new Map(ACTIVITY_SORTER_METADATA)
      this.metricDefinitions.forEach((md) => {
        initialViewerData.set(md.hash.toString(), this.createViewerMetric(md));
        initialSorterData.set(md.hash.toString(), this.createSorterMetric(md));
      });

      this.activityViewer = new Viewer({
        metadata: initialViewerData,
        contextProvider: this.createViewContextProvider()
      });

      this.activitySorter = new Sorter({ metadata: initialSorterData });

      this.activityInfo$ = this.activitiesService.getProfiles(this.metricDefinitions.map((md) => md.hash)).pipe(
        map((ds) => {
          return new DataSource<ClanMemberProfile>({ data: ds });
        }),
        tap((x) => {
          this.isLoading = false;
        })
      );
    }
  }

  // TODO: Eventually add formatting. Metric definitions have the formatting
  createViewerMetric(definition: MetricDefinition): ViewerMetadata<ClanMemberProfile, ViewContext> {
    return {
      label: definition.displayProperties.name,
      plainText: (item: ClanMemberProfile) =>
        `${item.profile.metrics.data.metrics[definition.hash].objectiveProgress.progress.toString()}`,
      render: (item: ClanMemberProfile) => {
        return {
          classList: 'text-center',
          text: item.profile.metrics.data.metrics[definition.hash].objectiveProgress.progress.toString()
        };
      }
    };
  }

  createSorterMetric(definition: MetricDefinition): SorterMetadata<ClanMemberProfile> {
    return {
      label: definition.displayProperties.name,
      comparator: (a, b) =>
        a.profile.metrics?.data?.metrics[definition.hash]?.objectiveProgress.progress <
        b.profile.metrics?.data?.metrics[definition.hash]?.objectiveProgress.progress
          ? -1
          : 1
    };
  }

  createViewContextProvider() {
    return of((item: ClanMemberProfile) => ({
      item
    }));
  }
}
