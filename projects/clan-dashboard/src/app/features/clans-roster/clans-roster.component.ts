import { Component, OnInit, ViewRef } from '@angular/core';
import { DataSource, Filterer, Grouper, Sorter, Viewer } from '@destiny/components';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { CLAN_ROSTER_VIEWER_METADATA } from './clan-roster-metadata';
import { ClanMemberProfile, ClansRosterService } from './clans-roster.service';

interface QueryResources {
  loading: Observable<boolean>;
  viewer: Viewer;
  filterer: Filterer;
  grouper: Grouper;
  sorter: Sorter;
  dataSource: DataSource;
}

@Component({
  selector: 'app-clans-roster',
  templateUrl: './clans-roster.component.html',
  styleUrls: ['./clans-roster.component.scss']
})
export class ClansRosterComponent implements OnInit {
  constructor(private clansRosterService: ClansRosterService) {}
  // stuff2$ = this.clansRosterService.activeClanPeople$;
  //members$ = this.clansRosterService.clanMembers$;
  profiles$ = this.clansRosterService.clanProfiles$;

  rosterViewer = new Viewer({ metadata: CLAN_ROSTER_VIEWER_METADATA });

  rosterInfo$ = combineLatest([this.clansRosterService.clanProfiles$]).pipe(
    map(([clanProfiles]) => {
      return {
        dataSource:new DataSource<ClanMemberProfile>({ data: clanProfiles }) ,
        viewer: this.rosterViewer
      };
    }),
    filter(ds => !!ds)
  );

  ngOnInit(): void {}
}
