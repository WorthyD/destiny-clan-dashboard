import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppConfig } from '@core/config/app-config';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { ProfileWorkerService } from '../../workers/profile-worker/profile-worker.service';
import { ProfileRecentActivityWorkerService } from '../../workers/profile-recent-activity/profile-recent-activity.service';
import { ClanConfigMembers } from './clan-updater.service';
import { filter, from, map, mergeMap, Observable, of, take, toArray } from 'rxjs';
import { nowPlusMinutes } from 'projects/data/src/lib/utility/date-utils';
import { updateClanMemberActivitySync } from '@core/store/clans';

@Injectable({
  providedIn: 'root'
})
export class MemberActivityUpdaterService {
  constructor(
    private store: Store,
    private profileRecentActivityWorkerService: ProfileRecentActivityWorkerService,
    private appConfig: AppConfig
  ) {}

  membersActivityUpdate(clans: ClanConfigMembers[]): Observable<ClanConfigMembers[]> {
    return from(clans).pipe(
      mergeMap((x) => {
        return this.memberActivityUpdate(x);
        //}

        //
        //return of(x);
      }, 1),
      toArray()
      ///   tap((x) => console.log('toarray 2', x))
    );
  }

  memberActivityUpdate(clan: ClanConfigMembers): Observable<ClanConfigMembers> {
    const lastUpdate = new Date(clan.clanConfig.memberRecentActivityUpdate || '1/1/1900');
    const staleDate = nowPlusMinutes(-this.appConfig.constants.PROFILE_UPDATING_EXP_MINUTES);

    if (staleDate > lastUpdate) {
      //      console.log(`Updating ${clan.clanConfig.clanId}`);
      //if (true === true) {
      // this.store.dispatch(
      //   addNotification({ notification: { id: 'memberProfile', title: 'Updating Profiles', data: { progress: 0 } } })
      // );
      const progress = (progressCount) => {
        // this.store.dispatch(
        //   updateNotification({
        //     notification: {
        //       id: 'memberProfile',
        //       title: 'Updating Profiles',
        //       data: { progress: progressCount }
        //     }
        //   })
        // );
        //       console.log('progress', progressCount);
      };
      console.log(clan.members);
      return this.profileRecentActivityWorkerService
        .updateAllRecentActivityCache(clan.clanConfig.clanId, clan.profiles, progress)
        .pipe(
          //this.profileWorkerService.loadProfiles(clan.clanConfig.clanId, clan.members, progress);
          //return this.profileRecentActivityWorkerService.members.pipe(
          // filter((x) => x.length > 0),
          take(1),
          map((x) => {
            // this.store.dispatch(memberProfileActions.loadMemberProfiles({ memberProfiles: x }));
            // this.store.dispatch(
            //   removeNotification({ notification: { id: 'memberProfile', title: 'Updating Profiles', data: 'done' } })
            // );
            // return memberProfileActions.loadMemberProfileSuccess();
            //         console.log(`done ${clan.clanConfig.clanId}`, x);
            this.store.dispatch(updateClanMemberActivitySync({ clanId: clan.clanConfig.clanId }));
            return clan;
          })
        );
    }
    //console.log(`Valid Cache ${clan.clanConfig.clanId}`);
    return of(clan);
  }
}
