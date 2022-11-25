import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, toArray, switchMap, tap, take, filter, distinctUntilChanged } from 'rxjs/operators';
import { ClanConfig, selectEnabledClans, updateClanProfileSync } from '../store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { from, Observable, of } from 'rxjs';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ProfileWorkerService } from '../../workers/profile-worker/profile-worker.service';
import { nowPlusMinutes } from 'projects/data/src/lib/utility/date-utils';
import { AppConfig } from '@core/config/app-config';
import { ProfileUpdaterService } from './profile-updater.service';
import { MemberActivityUpdaterService } from './member-activity-updater.service';

export interface ClanConfigMembers {
  clanConfig: ClanConfig;
  members: GroupsV2GroupMember[];
  profiles?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ClanUpdaterService {
  activeClanIds$ = this.store.select(selectEnabledClans);
  showLog = true;

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private profileWorkerService: ProfileWorkerService,
    private appConfig: AppConfig,
    private profileUpdaterService: ProfileUpdaterService,
    private memberActivityUpdaterService: MemberActivityUpdaterService
  ) {}

  update() {
    return this.activeClanIds$.pipe(
      //distinctUntilChanged(),
      // Take(1)?
      take(1),
      tap((x) => this.showLog && console.log('starting', x)),
      switchMap((activeClans) => this.memberUpdate(activeClans)),
      tap((x) => this.showLog && console.log('Member Update Complete', x)),
      switchMap((clans) => this.profileUpdaterService.profilesUpdate(clans)),
      tap((x) => this.showLog && console.log('Member Profile Update Complete', x)),
      switchMap((clans) => this.memberActivityUpdaterService.membersActivityUpdate(clans)),
      tap((x) => this.showLog && console.log('Member Recent Activity Update Complete', x))
      // tap((x) => console.log('complete', x))
    );
  }

  memberUpdate(activeClans) {
    return from(activeClans).pipe(
      mergeMap((clanConfig: ClanConfig) => {
        //console.log('merge map', clanConfig.clanId);
        return this.memberService.getClanMembersSerialized(clanConfig.clanId).pipe(
          map((members) => ({
            members,
            clanConfig
          }))
        );
      }, 1),
      toArray()
    );
  }

  // profilesUpdate(clans: ClanConfigMembers[]): Observable<ClanConfigMembers[]> {
  //   return from(clans).pipe(
  //     mergeMap((x) => {
  //       return this.profileUpdate(x).pipe(map((cm) => x));
  //       //}

  //       //
  //       //return of(x);
  //     }, 1),
  //     toArray()
  //     ///   tap((x) => console.log('toarray 2', x))
  //   );
  // }

  // profileUpdate(clan: ClanConfigMembers): Observable<ClanConfigMembers> {
  //   const lastUpdate = new Date(clan.clanConfig.profileUpdate || '1/1/1900');
  //   const staleDate = nowPlusMinutes(-this.appConfig.constants.PROFILE_UPDATING_EXP_MINUTES);

  //   if (staleDate > lastUpdate) {
  //     //      console.log(`Updating ${clan.clanConfig.clanId}`);
  //     //if (true === true) {
  //     // this.store.dispatch(
  //     //   addNotification({ notification: { id: 'memberProfile', title: 'Updating Profiles', data: { progress: 0 } } })
  //     // );
  //     const progress = (progressCount) => {
  //       // this.store.dispatch(
  //       //   updateNotification({
  //       //     notification: {
  //       //       id: 'memberProfile',
  //       //       title: 'Updating Profiles',
  //       //       data: { progress: progressCount }
  //       //     }
  //       //   })
  //       // );
  //       //       console.log('progress', progressCount);
  //     };
  //     this.profileWorkerService.loadProfiles(clan.clanConfig.clanId, clan.members, progress);
  //     return this.profileWorkerService.members.pipe(
  //       filter((x) => x.length > 0),
  //       take(1),
  //       map((x) => {
  //         // this.store.dispatch(memberProfileActions.loadMemberProfiles({ memberProfiles: x }));
  //         // this.store.dispatch(
  //         //   removeNotification({ notification: { id: 'memberProfile', title: 'Updating Profiles', data: 'done' } })
  //         // );
  //         // return memberProfileActions.loadMemberProfileSuccess();
  //         //         console.log(`done ${clan.clanConfig.clanId}`, x);
  //         this.store.dispatch(updateClanProfileSync({ clanId: clan.clanConfig.clanId }));
  //         return clan;
  //       })
  //     );
  //   }
  //   //console.log(`Valid Cache ${clan.clanConfig.clanId}`);
  //   return of(clan);
  // }
}
