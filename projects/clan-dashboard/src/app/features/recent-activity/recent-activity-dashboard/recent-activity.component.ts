import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataSource, Exporter, Filterer, Sorter, Viewer } from '@destiny/components';
import { BungieDatePipe, BungieDateTimePipe, PlaytimePipe } from '@destiny/components/pipes';
import { combineLatest, filter, map, Observable, of } from 'rxjs';
import { RecentActivityService } from '../data-access/recent-activity.service';
import { ProfileRecentActivity } from '../models/profile-recent-activity';
import {
  CLAN_ROSTER_EXPORTER_METADATA,
  RECENT_ACTIVITY_FILTERER_METADATA,
  RECENT_ACTIVITY_SORTER_METADATA,
  RECENT_ACTIVITY_VIEWER_METADATA
} from './recent-activity-metadata';

interface RosterActivityResources {
  loading: Observable<boolean>;
  viewer: Viewer;
  filterer: Filterer;
  //grouper: Grouper;
  exporter: Exporter;
  sorter: Sorter;
  dataSource: DataSource;
}

@Component({
  selector: 'app-recent-activity-viewer',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivityComponent implements OnInit {
  constructor(
    private recentActivityService: RecentActivityService,
    private playtimePipe: PlaytimePipe,
    private bungieDateTimePipe: BungieDateTimePipe
  ) {}

  clanProfileActivity$ = this.recentActivityService.activeClanActivity$;
  activityViewer = new Viewer({
    metadata: RECENT_ACTIVITY_VIEWER_METADATA,
    contextProvider: this.createViewContextProvider()
  }, '2Dashboard_Roster_Activity_Table_Viewer');
  activityFilterer = new Filterer({ metadata: RECENT_ACTIVITY_FILTERER_METADATA });
  activitySorter = new Sorter({ metadata: RECENT_ACTIVITY_SORTER_METADATA });
  activityExporter = new Exporter({
    metadata: CLAN_ROSTER_EXPORTER_METADATA,
    contextProvider: this.createViewContextProvider()
  });

  rosterRecentActivityInfo$: Observable<RosterActivityResources> = combineLatest([this.clanProfileActivity$]).pipe(
    map(([clanProfiles]) => {
      return {
        loading: of(false),
        dataSource: new DataSource<ProfileRecentActivity>({ data: clanProfiles }),
        viewer: this.activityViewer,
        filterer: this.activityFilterer,
        exporter: this.activityExporter,
        sorter: this.activitySorter
      };
    }),
    filter((ds) => !!ds)
  );
  createViewContextProvider() {
    return of((item: ProfileRecentActivity) => ({
      item,
      playTimePipe: this.playtimePipe,
      dateTimePipe: this.bungieDateTimePipe
      // dateTimePipe: this.bungieDateTimePipe
    }));
  }
  ngOnInit(): void {}
}
