import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import { Store } from '@ngrx/store';
// import {
//   selectAllClansMembersProfiles,
//   selectClanMemberProfileStateLoading
// } from '@core/store/clans-members-profiles/clan-members-profiles.selectors';
import { selectAllClansMembersProfiles, selectClanMemberProfileStateLoading } from '@dcd/shared/data-access/store';

import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { ClanBungieInfoService } from 'libs/data/src/lib/clan/bungie-info/bungie-info.service';
import { ClanRosterItem } from '@dcd/clans-roster/models';
import { BungieInfo } from '@destiny-clan-dashboard/data/models';

@Injectable()
export class ClansRosterService {
  clanProfiles$: Observable<ClanMemberProfile[]> = this.store.select(selectAllClansMembersProfiles);
  clanProfilesLoading$: Observable<boolean> = this.store.select(selectClanMemberProfileStateLoading); //.pipe(

  clanRosterItems$: Observable<ClanRosterItem[]> = this.clanProfiles$.pipe(
    switchMap((clanProfiles) => {
      //const members = clanProfiles.map((x) => x.member);
      const clanIds = [...new Set(clanProfiles.map((cp) => cp.clan.clanId))];
      const clanGroups = clanIds.map((clanId) => {
        return { clanId: clanId, members: clanProfiles.filter((x) => x.clan.clanId === clanId) };
      });

      return from(clanGroups).pipe(
        mergeMap((clanGroups) => {
          return this.bungieInfoService
            .getSerializedBungieInfosFromCache(
              clanGroups.clanId,
              clanGroups.members.map((m) => m.member)
            )
            .pipe(
              switchMap((result) => {
                return result;
              })
            );
        }),
        toArray(),
        map((bungieInfo: BungieInfo[]) => {
          return clanProfiles.map((cp) => {
            return {
              ...cp,
              bungieInfo: bungieInfo.find(
                (bi) => bi?.membershipId === cp.member?.bungieNetUserInfo?.membershipId?.toString()
              )
            };
          });
        })
      );
    })
  );

  constructor(private store: Store, private bungieInfoService: ClanBungieInfoService) {}
}
