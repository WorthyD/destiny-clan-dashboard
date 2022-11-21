import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClanIds, selectEnabledClans, selectLastRecentActivityUpdate } from '@core/store/clans';
import { combineLatest, from, map, mergeMap, Observable, switchMap, tap, toArray } from 'rxjs';
import { ClanMemberProfile } from '@features/clans-roster/clans-roster.service';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { MemberProfile } from '@destiny/data/models';
import { ProfileRecentActivityWorkerService } from '../../../workers/profile-recent-activity/profile-recent-activity.service';
@Injectable()
export class RecentActivityService {
  activeClans$ = this.store.select(selectEnabledClans);
  activeClansId$ = this.store.select(selectEnabledClanIds);

  activeClanUpdateDates$ = this.activeClans$.pipe(
    switchMap((clans) => {
      const arraySelectors = clans.map((clan) => {
        return this.store.select(selectLastRecentActivityUpdate(clan.clanId));
      });

      return combineLatest(arraySelectors);
    })
  );
  clanMembers$ = this.activeClans$.pipe(
    switchMap((activeClans) => {
      return from(activeClans).pipe(
        mergeMap((clan) => {
          return this.memberService.getClanMembersSerialized(clan.clanId).pipe(
            map((result) => {
              return { clan, members: result };
            })
          );
        }),
        toArray()
      );
    })
  );
  clanProfiles$: Observable<any> = this.clanMembers$.pipe(
    //clanProfiles$: Observable<ClanMemberProfile[]> = this.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          //switchMap((clanAndMembers) => {
          return this.profileService
            .getSerializedProfilesFromCache(clanAndMembers.clan.clanId, clanAndMembers.members, [], [])
            .pipe(
              switchMap((memberProfiles) => {
                //return of(null);
                return this.profileActivityService.getAllRecentActivitiesFromCache(
                  clanAndMembers.clan.clanId,
                  memberProfiles
                );
              })
              // map((result: MemberProfile[]) => {
              //   return {
              //     clan: {
              //       clanId: clanAndMembers.clan.clanId,
              //       clanName: clanAndMembers.clan.clanName,
              //       clanTag: clanAndMembers.clan.clanTag
              //     },
              //     member: clanAndMembers.members.find(
              //       (x) => x.destinyUserInfo?.membershipId == result.profile.data.userInfo?.membershipId
              //     ),
              //     profile: result
              //   };
              // })
              // tap((x) => console.log('stuff', x))
            );
        }),
        // tap((x) => console.log('before array', x)),
        toArray(),
        tap((x) => console.log('after array', x))
      );
    })
  );

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private profileService: ProfileService,
    private profileActivityService: ProfileRecentActivityWorkerService
  ) {}
}
