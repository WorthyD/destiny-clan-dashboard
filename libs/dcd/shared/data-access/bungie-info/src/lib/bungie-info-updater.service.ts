import { Injectable } from '@angular/core';
// import { AppConfig } from '@core/config/app-config';
import { AppConfigService } from '@dcd/shared/utils/app-config';
// import { updateBungieInfoSync, updateClanProfileSync } from '@core/store/clans';
// import { addNotification, removeNotification, updateNotification } from '@core/store/notifications';
import { Store } from '@ngrx/store';
// import { ClanDatabase } from 'libs/data/src/lib/clan/clan-database';
import { nowPlusMinutes } from '@dcd/shared/utils';
import { filter, from, map, mergeMap, Observable, of, take, toArray } from 'rxjs';

import { BungieInfoWorkerService } from './bungie-info-worker.fake.service';

import {
  addNotification,
  removeNotification,
  updateBungieInfoSync,
  updateNotification
} from '@dcd/shared/data-access/store';
import { ClanConfigMembers } from '@dcd/shared/models';

@Injectable({
  providedIn: 'root'
})
export class BungieInfoUpdaterService {
  //infoService: BungieInfoWorkerService;
  constructor(
    private store: Store,
    private bungieInfoWorker: BungieInfoWorkerService,
    private appConfig: AppConfigService
  ) {
    // const clanDB = new ClanDatabase();
    // this.infoService = new BungieInfoWorkerService(clanDB, appConfig.apiKey);
  }

  updateAllClansBungieInfo(clans: ClanConfigMembers[]): Observable<ClanConfigMembers[]> {
    return from(clans).pipe(
      // TODO Verify Merge Map is appropriate for this.
      mergeMap((x) => {
        return this.updateBungieInfo(x).pipe(map((cm) => cm));
      }, 1),
      toArray()
    );
  }

  updateBungieInfo(clan: ClanConfigMembers): Observable<ClanConfigMembers> {
    const lastUpdate = new Date(clan.clanConfig.bungieInfoUpdate || '1/1/1900');
    const staleDate = nowPlusMinutes(-this.appConfig.config.constants.PROFILE_UPDATING_EXP_MINUTES);

    if (staleDate > lastUpdate) {
      this.store.dispatch(
        addNotification({
          notification: {
            id: 'bungieInfo',
            title: `Updating ${clan.clanConfig.clanName} Bungie Info`,
            data: { progress: 0, complete: 0, total: clan.members.length }
          }
        })
      );
      const progress = (progressCount: any) => {
        this.store.dispatch(
          updateNotification({
            notification: {
              id: 'bungieInfo',
              title: `Updating ${clan.clanConfig.clanName} Bungie Info`,
              data: {
                progress: progressCount / clan.members.length,
                complete: progressCount,
                total: clan.members.length
              }
            }
          })
        );
      };
      return this.bungieInfoWorker.updateAllBungieInfoCache(clan.clanConfig.clanId, clan.members, progress).pipe(
        take(1),
        map((x) => {
          // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
          this.store.dispatch(
            removeNotification({
              notification: {
                id: 'bungieInfo',
                title: `Updating ${clan.clanConfig.clanName} Bungie Info`,
                data: { progress: clan.members.length, complete: clan.members.length, total: clan.members.length }
              }
            })
          );

          // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
          this.store.dispatch(updateBungieInfoSync({ clanId: clan.clanConfig.clanId }));

          //
          // console.log('------------- dispatch update ------------------');
          // this.clanMemberService.forceReload();
          return {
            ...clan
          };
        })
      );
    }

    return of(clan);
    // return this.profileService.getSerializedProfilesFromCache(clan.clanConfig.clanId, clan.members, [], [], []).pipe(
    //   map((x) => {
    //     return { ...clan, profiles: x };
    //   })
    // );
  }
}
