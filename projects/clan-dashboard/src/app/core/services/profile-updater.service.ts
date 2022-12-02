import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, toArray, switchMap, tap, take, filter } from 'rxjs/operators';
import { ClanConfig, selectEnabledClans, updateClanProfileSync } from '../store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { from, Observable, of } from 'rxjs';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ProfileWorkerService } from '../../workers/profile-worker/profile-worker.service';
import { nowPlusMinutes } from 'projects/data/src/lib/utility/date-utils';
import { AppConfig } from '@core/config/app-config';
import { ClanConfigMembers } from './clan-updater.service';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { ClansMembersService } from './clans-members.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdaterService {
  profileService: ProfileService;
  constructor(
    private store: Store,
    private clanMemberService: ClansMembersService,
    private profileWorkerService: ProfileWorkerService,
    private appConfig: AppConfig
  ) {
    const clanDB = new ClanDatabase();
    this.profileService = new ProfileService(clanDB, appConfig.apiKey);
  }

  profilesUpdate(clans: ClanConfigMembers[]): Observable<ClanConfigMembers[]> {
    return from(clans).pipe(
      // TODO Verify Merge Map is appropriate for this.
      mergeMap((x) => {
        return this.profileUpdate(x).pipe(map((cm) => cm));
      }, 1),
      toArray()
      // tap((x) => console.log('toarray 2', x))
    );
  }

  profileUpdate(clan: ClanConfigMembers): Observable<ClanConfigMembers> {
    const lastUpdate = new Date(clan.clanConfig.profileUpdate || '1/1/1900');
    // const lastUpdate = new Date('1/1/1900');
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
      return this.profileWorkerService.loadProfiles(clan.clanConfig.clanId, clan.members, progress).pipe(
        filter((x) => x.length > 0),
        take(1),
        map((x) => {
          // this.store.dispatch(memberProfileActions.loadMemberProfiles({ memberProfiles: x }));
          // this.store.dispatch(
          //   removeNotification({ notification: { id: 'memberProfile', title: 'Updating Profiles', data: 'done' } })
          // );
          // return memberProfileActions.loadMemberProfileSuccess();
          //         console.log(`done ${clan.clanConfig.clanId}`, x);
          //  console.log('member workers', x);
          this.clanMemberService.forceReload();
          this.store.dispatch(updateClanProfileSync({ clanId: clan.clanConfig.clanId }));
          return {
            ...clan,
            profiles: x
          };
        })
      );
    }
    //console.log(`Valid Cache ${clan.clanConfig.clanId}`);
    //; return of(clan);
    // console.log('getting from cache');
    return this.profileService.getSerializedProfilesFromCache(clan.clanConfig.clanId, clan.members, [], []).pipe(
      map((x) => {
        return { ...clan, profiles: x };
      })
    );
  }
}
