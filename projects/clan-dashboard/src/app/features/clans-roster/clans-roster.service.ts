import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClanIds, selectEnabledClans, selectLastProfileUpdate } from '@core/store/clans';
import { forkJoin, from, map, mergeMap, switchMap, tap, toArray, combineLatest, distinctUntilChanged } from 'rxjs';
// import {} from '@destiny/data/';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { MemberProfile } from '@destiny/data/models';

@Injectable()
export class ClansRosterService {
  activeClansId$ = this.store.select(selectEnabledClanIds);

  activeClanUpdateDates$ = this.activeClansId$.pipe(
    switchMap((clanIds) => {
      const arraySelectors = clanIds.map((clanId) => {
        return this.store.select(selectLastProfileUpdate(clanId));
      });

      return combineLatest(arraySelectors);
      // return from(clanIds).pipe(
      //   switchMap((clanId) => {
      //     console.log('', clanId);
      //     return this.store.select(selectLastProfileUpdate(clanId));
      //   })

      //   // tap((x) => {
      //   //   console.log('tapping1', x);
      //   // })
      // );
    })
  );

  clanMembers$ = this.activeClansId$.pipe(
    switchMap((activeClanIds) => {
      console.log('active clans');
      return from(activeClanIds).pipe(
        mergeMap((clanId) => {
          console.log('mmerge map');
          return this.memberService.getClanMembersSerialized(clanId).pipe(
            map((result) => {
              return { clanId, members: result };
            })
          );
        }),
        toArray()
      );
    }),
    tap((x) => console.log(x))
  );

  clanProfiles$ = this.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          return this.profileService
            .getSerializedProfiles<MemberProfile>(clanAndMembers.clanId, clanAndMembers.members, [], [])
            .pipe(
              map((result: MemberProfile) => {
                return {
                  clanId: clanAndMembers.clanId,
                  members: clanAndMembers.members.find(
                    (x) => x.destinyUserInfo?.membershipId == result.profile.data.userInfo?.membershipId
                  ),
                  profiles: result
                };
              })
            );
        }),
        toArray()
      );
    })
  );

  // Whenever activeClanUpdateDates gets updated. Run this observable.
  activeClanPeople$ = this.activeClanUpdateDates$.pipe(
    map((x) => {
      return (
        combineLatest([this.activeClansId$, this.activeClanUpdateDates$]),
        map(([clans, clanDates]) => {
          return clans;
        })
      );
    })
  );

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private profileService: ProfileService
  ) {}
}
