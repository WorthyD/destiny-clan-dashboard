import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileRecentActivityWorkerService } from './profile-recent-activity.fake.service';
import { from, map, mergeMap, Observable, of, take, toArray } from 'rxjs';
import { nowPlusMinutes } from '@destiny-clan-dashboard/shared/utils';
import { AppConfigService } from '@dcd/shared/utils/app-config';
import {
  addNotification,
  removeNotification,
  updateClanMemberActivitySync,
  updateNotification
} from '@dcd/shared/data-access/store';
import { ClanConfigMembers } from '@dcd/shared/models';

@Injectable({
  providedIn: 'root'
})
export class MemberActivityUpdaterService {
  constructor(
    private store: Store,
    private profileRecentActivityWorkerService: ProfileRecentActivityWorkerService,
    private appConfig: AppConfigService
  ) {}

  membersActivityUpdate(clans: ClanConfigMembers[]): Observable<ClanConfigMembers[]> {
    return from(clans).pipe(
      mergeMap((x) => {
        return this.memberActivityUpdate(x);
      }, 1),
      toArray()
    );
  }

  memberActivityUpdate(clan: ClanConfigMembers): Observable<ClanConfigMembers> {
    const lastUpdate = new Date(clan.clanConfig.memberRecentActivityUpdate || '1/1/1900');
    const staleDate = nowPlusMinutes(-this.appConfig.config.constants.PROFILE_UPDATING_EXP_MINUTES);

    if (staleDate > lastUpdate) {
      this.store.dispatch(
        addNotification({
          notification: {
            id: 'memberProfile',
            title: `Updating ${clan.clanConfig.clanName} Recent Activity`,
            data: { progress: 0, complete: 0, total: clan.members.length }
          }
        })
      );

      const progress = (progressCount: any) => {
        this.store.dispatch(
          updateNotification({
            notification: {
              id: 'memberProfile',
              title: `Updating ${clan.clanConfig.clanName} Recent Activity`,
              data: {
                progress: progressCount / clan.members.length,
                complete: progressCount,
                total: clan.members.length
              }
            }
          })
        );
      };

      return this.profileRecentActivityWorkerService
        .updateAllRecentActivityCache(clan.clanConfig.clanId, clan.profiles!, progress)
        .pipe(
          take(1),
          map((x) => {
            // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
            this.store.dispatch(
              removeNotification({
                notification: {
                  id: 'memberProfile',
                  title: `Updating ${clan.clanConfig.clanName} Recent Activity`,
                  data: { progress: clan.members.length, complete: clan.members.length, total: clan.members.length }
                }
              })
            );

            // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
            this.store.dispatch(updateClanMemberActivitySync({ clanId: clan.clanConfig.clanId }));

            return clan;
          })
        );
    }
    return of(clan);
  }
}
