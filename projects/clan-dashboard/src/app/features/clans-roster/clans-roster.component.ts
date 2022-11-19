import { Component, OnInit, ViewRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { DataSource, Exporter, Filterer, Grouper, Sorter, Viewer } from '@destiny/components';
import { combineLatest, filter, map, Observable, of } from 'rxjs';
import { CLAN_ROSTER_VIEWER_METADATA } from './clan-roster-metadata';
import { CLAN_ROSTER_FILTERER_METADATA } from './clan-roster-metadata/ClanRosterFilterer';
import { CLAN_ROSTER_SORTER_METADATA } from './clan-roster-metadata/ClanRosterSorter';
import { ClanMemberProfile, ClansRosterService } from './clans-roster.service';

import { BungieDatePipe, BungieDateTimePipe } from '@destiny/components/pipes/bungie-date';
import { CLAN_ROSTER_EXPORTER_METADATA } from './clan-roster-metadata/ClanRosterExporter';
interface RosterResources {
  loading: Observable<boolean>;
  viewer: Viewer;
  filterer: Filterer;
  //grouper: Grouper;
  exporter: Exporter;
  sorter: Sorter;
  dataSource: DataSource;
}

@Component({
  selector: 'app-clans-roster',
  templateUrl: './clans-roster.component.html',
  styleUrls: ['./clans-roster.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClansRosterComponent implements OnInit {
  constructor(
    private clansRosterService: ClansRosterService,
    private bungieDatePage: BungieDatePipe,
    private bungieDateTimePipe: BungieDateTimePipe
  ) {}
  // stuff2$ = this.clansRosterService.activeClanPeople$;
  //members$ = this.clansRosterService.clanMembers$;
  profiles$ = this.clansRosterService.clanProfiles$;

  rosterViewer = new Viewer({
    metadata: CLAN_ROSTER_VIEWER_METADATA,
    contextProvider: this.createViewContextProvider()
  });
  rosterFilter = new Filterer({ metadata: CLAN_ROSTER_FILTERER_METADATA });
  rosterSorter = new Sorter({ metadata: CLAN_ROSTER_SORTER_METADATA });
  rosterExporter = new Exporter({ metadata: CLAN_ROSTER_EXPORTER_METADATA });

  rosterInfo$: Observable<RosterResources> = combineLatest([this.clansRosterService.clanProfiles$]).pipe(
    map(([clanProfiles]) => {
      return {
        loading: of(false),
        dataSource: new DataSource<ClanMemberProfile>({ data: clanProfiles }),
        viewer: this.rosterViewer,
        filterer: this.rosterFilter,
        exporter: this.rosterExporter,
        sorter: this.rosterSorter
      };
    }),
    filter((ds) => !!ds)
  );

  createViewContextProvider() {
    return of((item: ClanMemberProfile) => ({
      item,
      datePipe: this.bungieDatePage,
      dateTimePipe: this.bungieDateTimePipe
    }));
  }

  ngOnInit(): void {}
}
