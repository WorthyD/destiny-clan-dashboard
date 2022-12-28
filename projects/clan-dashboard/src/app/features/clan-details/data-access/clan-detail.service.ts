import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GroupsV2GroupV2Card, GroupV2Service } from 'bungie-api-angular';
import { map } from 'rxjs';

import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { addClan, removeClan, resetClan } from '@core/store/clans/clans.actions';

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

  resetClan(clan: GroupsV2GroupV2Card) {
    this.db.purgeDatabase(clan.groupId.toString());
    this.store.dispatch(
      resetClan({ clanId: clan.groupId.toString(), clanName: clan.name, clanTag: clan.clanInfo.clanCallsign || '' })
    );
  }

  addClan(clan: GroupsV2GroupV2Card) {
    this.store.dispatch(
      addClan({ clanId: clan.groupId.toString(), clanName: clan.name, clanTag: clan.clanInfo.clanCallsign || '' })
    );
  }
}
