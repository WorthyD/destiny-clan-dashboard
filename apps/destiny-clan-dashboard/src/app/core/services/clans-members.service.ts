import { Injectable } from '@angular/core';
import { ClanConfig } from '@core/store/clans';
import { ClanMembersService } from '@destiny-clan-dashboard/data/clan/clan-members';
import { MemberProfile } from '@destiny-clan-dashboard/data/models';
import { getClanMemberId, getMemberProfileId } from '@destiny-clan-dashboard/shared/utils';
import { Store } from '@ngrx/store';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ClanProfileService } from 'libs/data/src/lib/clan/profiles/profile.service';
import { catchError, filter, from, map, mergeMap, Observable, of, shareReplay, switchMap, tap, toArray } from 'rxjs';
import { selectEnabledClans } from '../store/clans/clans.selectors';
import { SeasonService } from './season.service';
import { selectAllClansMembersProfiles } from '@core/store/clans-members-profiles/clan-members-profiles.selectors';
// import { ClanMemberProfileWID } from '@core/store/clans-members-profiles/clan-members-profiles.state';
import { selectAllClansWithMembers } from '@core/store/clans-with-members';
import { selectAllClansWithMembersProfiles } from '@core/store/clans-with-members-profiles';

export interface ClanConfigMembers {
  clan: ClanConfig;
  members: GroupsV2GroupMember[];
}

@Injectable({
  providedIn: 'root'
})
export class ClansMembersService {
  activeClans$ = this.store.select(selectEnabledClans);
  clanProfiles$: Observable<ClanMemberProfile[]> = this.store.select(selectAllClansMembersProfiles);
  clanMembers$: Observable<ClanConfigMembers[]> = this.store.select(selectAllClansWithMembers);

  clanMembersProfiles$ = this.store.select(selectAllClansWithMembersProfiles);

  // clanMembers$ Observable<ClanConfigMembers[]>
  //   clanMembersProfiles$: Observable<{
  //     profiles: MemberProfile[];
  //     clan: ClanConfig;
  //     members: GroupsV2GroupMember[];
  // }[]>

  // clanProfiles$ Observable<ClanMemberProfile[]>

  // clanMembers$: Observable<ClanConfigMembers[]> = this.activeClans$.pipe(
  //   switchMap((activeClans) => {
  //     if (!this.clanMemberCache$) {
  //       this.clanMemberCache$ = from(activeClans)
  //         .pipe(
  //           mergeMap((clan) => {
  //             // TODO: Move this to state
  //             console.log('------for members-----');
  //             return this.memberService.getClanMembersCachedSerialized(clan.clanId).pipe(
  //               map((result) => {
  //                 return { clan, members: result };
  //               }),
  //               catchError(() => {
  //                 console.error(`Error pulling ${clan.clanId}`);
  //                 return of(null);
  //               })
  //             );
  //           }),
  //           filter((x) => !!x),
  //           toArray()
  //         )
  //         .pipe(shareReplay(1)) as Observable<ClanConfigMembers[]>;
  //     }
  //     return this.clanMemberCache$;
  //   })
  // );

  // clanMembersProfiles$ = this.clanMembers$.pipe(
  //   switchMap((clansAndMembers) => {
  //     return from(clansAndMembers).pipe(
  //       mergeMap((clanAndMembers) => {
  //         return this.profileService
  //           .getSerializedProfilesFromCache(
  //             clanAndMembers.clan.clanId,
  //             clanAndMembers.members,
  //             this.seasonService.getSeasonProgressionHashes(),
  //             [],
  //             [],
  //             []
  //           )
  //           .pipe(
  //             map((x) => {
  //               return {
  //                 ...clanAndMembers,
  //                 profiles: x
  //               };
  //             })
  //           );
  //       }),
  //       toArray()
  //     );
  //   })
  // );

  // clanProfiles$: Observable<ClanMemberProfile[]> = this.clanMembers$.pipe(
  //   switchMap((clansAndMembers) => {
  //     return from(clansAndMembers).pipe(
  //       mergeMap((clanAndMembers) => {
  //         return this.profileService
  //           .getSerializedProfilesFromCache(
  //             clanAndMembers.clan.clanId,
  //             clanAndMembers.members,
  //             this.seasonService.getSeasonProgressionHashes(),
  //             [],
  //             [],
  //             []
  //           )
  //           .pipe(
  //             switchMap((resultProfiles: MemberProfile[]) => {
  //               return clanAndMembers.members.map((member) => {
  //                 return {
  //                   clan: {
  //                     clanId: clanAndMembers.clan.clanId,
  //                     clanName: clanAndMembers.clan.clanName,
  //                     clanTag: clanAndMembers.clan.clanTag
  //                   },
  //                   member,
  //                   profile: resultProfiles.find((profile) => {
  //                     return getClanMemberId(member) === getMemberProfileId(profile);
  //                   })
  //                 };
  //               });
  //             })
  //           );
  //       }),
  //       toArray()
  //     );
  //   })
  // );

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private profileService: ClanProfileService,
    private seasonService: SeasonService
  ) {}

  // getActiveClanMembers(clans: ClanConfig[]) {
  //   return from(clans).pipe(
  //     mergeMap((clan) => {
  //       // console.log('--------------for state------------');
  //       // TODO: Move this to state
  //       return this.memberService.getClanMembersCachedSerialized(clan.clanId).pipe(
  //         map((result) => {
  //           return { clan, members: result };
  //         }),
  //         catchError(() => {
  //           console.error(`Error pulling ${clan.clanId}`);
  //           return of(null);
  //         })
  //       );
  //     }),
  //     filter((x) => !!x),
  //     toArray(),
  //     switchMap((clansAndMembers) => {
  //       return from(clansAndMembers).pipe(
  //         mergeMap((clanAndMembers) => {
  //           return this.profileService
  //             .getSerializedProfilesFromCache(
  //               clanAndMembers.clan.clanId,
  //               clanAndMembers.members,
  //               this.seasonService.getSeasonProgressionHashes(),
  //               [],
  //               [],
  //               []
  //             )
  //             .pipe(
  //               switchMap((resultProfiles: MemberProfile[]) => {
  //                 return clanAndMembers.members.map((member) => {
  //                   return {
  //                     clan: {
  //                       clanId: clanAndMembers.clan.clanId,
  //                       clanName: clanAndMembers.clan.clanName,
  //                       clanTag: clanAndMembers.clan.clanTag
  //                     },
  //                     member,
  //                     profile: resultProfiles.find((profile) => {
  //                       return getClanMemberId(member) === getMemberProfileId(profile);
  //                     })
  //                   };
  //                 });
  //               })
  //             );
  //         }),
  //         toArray()
  //       );
  //     })
  //   );
  // }
}
