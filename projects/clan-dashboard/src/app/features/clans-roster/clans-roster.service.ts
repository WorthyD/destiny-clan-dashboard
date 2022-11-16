import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClanIds, selectEnabledClans, selectLastProfileUpdate } from '@core/store/clans';
import { forkJoin, from, map, mergeMap, switchMap, tap, toArray, combineLatest, distinctUntilChanged, Observable } from 'rxjs';
// import {} from '@destiny/data/';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { MemberProfile } from '@destiny/data/models';
import { GroupsV2GroupMember } from 'bungie-api-angular';

export interface ClanMemberProfile {
  clan: {
    clanId: string;
    clanName: string;
    clanTag: string;
  };
  member: GroupsV2GroupMember;
  profile: MemberProfile;
}

@Injectable()
export class ClansRosterService {
  activeClans$ = this.store.select(selectEnabledClans);
  activeClansId$ = this.store.select(selectEnabledClanIds);

  activeClanUpdateDates$ = this.activeClans$.pipe(
    switchMap((clans) => {
      const arraySelectors = clans.map((clan) => {
        return this.store.select(selectLastProfileUpdate(clan.clanId));
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
    }),
    // tap((x) => console.log(x))
  );

  clanProfiles$: Observable<ClanMemberProfile[]> = this.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          return this.profileService
            .getSerializedProfiles<MemberProfile>(clanAndMembers.clan.clanId, clanAndMembers.members, [], [])
            .pipe(
              map((result: MemberProfile) => {
                return {
                  clan: {
                    clanId: clanAndMembers.clan.clanId,
                    clanName:clanAndMembers.clan.clanName,
                    clanTag:clanAndMembers.clan.clanTag,
                  },
                  member: clanAndMembers.members.find(
                    (x) => x.destinyUserInfo?.membershipId == result.profile.data.userInfo?.membershipId
                  ),
                  profile: result
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
