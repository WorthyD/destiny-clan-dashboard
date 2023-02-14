import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { DataSource, Exporter, Filterer, Sorter, Viewer } from '@destiny/components';
import { map, Observable, of, tap } from 'rxjs';

import { BungieDatePipe, BungieDateTimePipe } from '@destiny/components/pipes/bungie-date';
import { ClansRosterService } from '../data-access/clans-roster.service';
import { CLAN_ROSTER_VIEWER_METADATA } from './clan-roster-metadata';
import { CLAN_ROSTER_FILTERER_METADATA } from './clan-roster-metadata/ClanRosterFilterer';
import { CLAN_ROSTER_SORTER_METADATA } from './clan-roster-metadata/ClanRosterSorter';
// import { CLAN_ROSTER_EXPORTER_METADATA } from './clan-roster-metadata/ClanRosterExporter';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';

interface RosterResources {
  viewer: Viewer;
  filterer: Filterer;
  // exporter: Exporter;
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
export class ClansRosterComponent {
  constructor(
    private clansRosterService: ClansRosterService,
    private bungieDatePage: BungieDatePipe,
    private bungieDateTimePipe: BungieDateTimePipe
  ) {}
  rosterViewer = new Viewer(
    {
      metadata: CLAN_ROSTER_VIEWER_METADATA,
      contextProvider: this.createViewContextProvider()
    },
    'D2Dashboard_Roster_Table_ViewerV2'
  );
  rosterFilter = new Filterer({ metadata: CLAN_ROSTER_FILTERER_METADATA });
  rosterSorter = new Sorter({ metadata: CLAN_ROSTER_SORTER_METADATA });
  // rosterExporter = new Exporter({ metadata: CLAN_ROSTER_EXPORTER_METADATA });
  isLoading = true;

  rosterInfo$: Observable<RosterResources> = this.clansRosterService.clanRosterItems$.pipe(
    map((clanProfiles) => {
      return {
        dataSource: new DataSource<ClanMemberProfile>({ data: clanProfiles }),
        viewer: this.rosterViewer,
        filterer: this.rosterFilter,
      //  exporter: this.rosterExporter,
        sorter: this.rosterSorter
      };
    }),
    tap((x) => (this.isLoading = false))
  );

  createViewContextProvider() {
    return of((item: ClanMemberProfile) => ({
      item,
      datePipe: this.bungieDatePage,
      dateTimePipe: this.bungieDateTimePipe
    }));
  }
}
