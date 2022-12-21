import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GroupsV2GroupV2Card, GroupV2Service } from 'bungie-api-angular';
import { forkJoin, map, Observable, take } from 'rxjs';
import { ClanDetailsModule } from '../clan-details.module';

import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { addClan, removeClan } from '@core/store/clans/clans.actions';

@Injectable({
  //Note can't figure out how to provide in the module I want.
  providedIn: 'root'
})
export class ClanDetailService {
  constructor(
    private groupService: GroupV2Service,
    private httpClient: HttpClient,
    private store: Store,
    private db: ClanDatabase
  ) {}

  getClan(clanId) {
    return this.groupService.groupV2GetGroup(clanId).pipe(
      map((clanResult) => {
        return clanResult.Response.detail;
      })
    );
  }

  removeClan(clanId: string) {
    this.store.dispatch(removeClan({ clanId }));
    this.db.purgeDatabase(clanId);
  }

  addClan(clan: GroupsV2GroupV2Card) {
    this.store.dispatch(
      addClan({ clanId: clan.groupId.toString(), clanName: clan.name, clanTag: clan.clanInfo.clanCallsign || '' })
    );
  }
}
