import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClanIds, selectEnabledClans, selectLastProfileUpdate } from '@core/store/clans';
import {
  forkJoin,
  from,
  map,
  mergeMap,
  switchMap,
  tap,
  toArray,
  combineLatest,
  distinctUntilChanged,
  Observable
} from 'rxjs';
// import {} from '@destiny/data/';
// import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { MemberProfile } from '@destiny/data/models';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { getClanMemberId, getMemberProfileId } from '@destiny/data/utility';
import { ClansMembersService } from '@core/services/clans-members.service';

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

  // clanMembers$ = this.activeClans$.pipe(
  //   switchMap((activeClans) => {
  //     return from(activeClans).pipe(
  //       mergeMap((clan) => {
  //         return this.memberService.getClanMembersSerialized(clan.clanId).pipe(
  //           map((result) => {
  //             return { clan, members: result };
  //           })
  //         );
  //       }),
  //       toArray()
  //     );
  //   })
  //   // tap((x) => console.log(x))
  // );

  clanProfiles$: Observable<ClanMemberProfile[]> = this.memberService.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          return this.profileService
            .getSerializedProfilesFromCache(clanAndMembers.clan.clanId, clanAndMembers.members, [], [])
            .pipe(
              switchMap((resultProfiles: MemberProfile[]) => {
                return clanAndMembers.members.map((member) => {
                  return {
                    clan: {
                      clanId: clanAndMembers.clan.clanId,
                      clanName: clanAndMembers.clan.clanName,
                      clanTag: clanAndMembers.clan.clanTag
                    },
                    member,
                    profile: resultProfiles.find((profile) => {
                      return getClanMemberId(member) === getMemberProfileId(profile);
                    })
                  };
                });

                // return {
                //   clan: {
                //     clanId: clanAndMembers.clan.clanId,
                //     clanName: clanAndMembers.clan.clanName,
                //     clanTag: clanAndMembers.clan.clanTag
                //   },
                //   member: clanAndMembers.members.find(
                //     (x) => x.destinyUserInfo?.membershipId == result?.profile?.data?.userInfo?.membershipId
                //   ),
                //   profile: result
                // };
              })
            );
        }),
        toArray()
      );
    })
  );

  // TODO: Make sure UI updates eventually
  // Whenever activeClanUpdateDates gets updated. Run this observable.
  activeClanPeople$ = this.clanProfiles$.pipe(tap((x) => console.log('tapping')));
  /*
  activeClanPeople$ = this.activeClanUpdateDates$.pipe(
    switchMap((x) => {
      return this.clanProfiles$;
    })
  );
  */

  constructor(
    private store: Store,
    private memberService: ClansMembersService,
    private profileService: ProfileService
  ) {}
}
