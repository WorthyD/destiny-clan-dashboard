import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, toArray, switchMap, tap, take, filter } from 'rxjs/operators';
import { ClanConfig, selectEnabledClans } from '../store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { from, Observable, of } from 'rxjs';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ProfileWorkerService } from '../../workers/profile-worker.service';

interface ClanConfigMembers {
  clanConfig: ClanConfig;
  members: GroupsV2GroupMember[];
}

@Injectable({
  providedIn: 'root'
})
export class ClanUpdaterService {
  activeClanIds$ = this.store.select(selectEnabledClans);

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private profileWorkerService: ProfileWorkerService
  ) {}

  update() {
    return this.activeClanIds$.pipe(
      tap((x) => console.log('starting')),
      switchMap((activeClans) => this.memberUpdate(activeClans)),
      tap((x) => console.log('Member Update Complete', x)),
      switchMap((clans) => this.profilesUpdate(clans)),
      tap((x) => console.log('complete', x))
    );
  }

  memberUpdate(activeClans) {
    return from(activeClans).pipe(
      mergeMap((clanConfig: ClanConfig) => {
        console.log('merge map', clanConfig.clanId);
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

  profilesUpdate(clans: ClanConfigMembers[]) {
    return from(clans).pipe(
      mergeMap((x) => {
        console.log('merge map', x.clanConfig.clanId);
        return this.profileUpdate(x).pipe(map((cm) => cm));
      }, 1),
      toArray(),
      tap((x) => console.log('toarray 2', x))
    );
  }

  profileUpdate(clan: ClanConfigMembers): Observable<ClanConfigMembers> {
    console.log('testing', clan.clanConfig.clanId);
    if (true === true) {
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
        console.log('progress', progressCount);
      };
      this.profileWorkerService.loadProfiles(clan.clanConfig.clanId, clan.members, progress);
      return this.profileWorkerService.members.pipe(
        filter((x) => x.length > 0),
        take(1),
        map((x) => {
          // this.store.dispatch(memberProfileActions.loadMemberProfiles({ memberProfiles: x }));
          // this.store.dispatch(
          //   removeNotification({ notification: { id: 'memberProfile', title: 'Updating Profiles', data: 'done' } })
          // );
          // return memberProfileActions.loadMemberProfileSuccess();
          console.log(`done ${clan.clanConfig.clanId}`, x);
          return clan;
        })
      );
    }
    console.log('else');
    return of(clan);
  }
}
