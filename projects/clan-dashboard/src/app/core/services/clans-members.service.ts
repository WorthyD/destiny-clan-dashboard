import { Injectable } from '@angular/core';
import { ClanConfig } from '@core/store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { MemberProfile } from '@destiny/data/models';
import { getClanMemberId, getMemberProfileId } from '@destiny/data/utility';
import { Store } from '@ngrx/store';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { catchError, filter, from, map, mergeMap, Observable, of, switchMap, tap, toArray } from 'rxjs';
import { selectEnabledClans } from '../store/clans/clans.selectors';

export interface ClanConfigMembers {
  clan: ClanConfig;
  members: GroupsV2GroupMember[];
}

@Injectable({
  providedIn: 'root'
})
export class ClansMembersService {
  activeClans$ = this.store.select(selectEnabledClans);

  clanMembers$ = this.activeClans$.pipe(
    switchMap((activeClans) => {
      return from(activeClans).pipe(
        mergeMap((clan) => {
          return this.memberService.getClanMembersSerialized(clan.clanId).pipe(
            map((result) => {
              return { clan, members: result };
            }),
            catchError(() => {
              console.error(`Error pulling ${clan.clanId}`);
              return of(null);
            })
          );
        }),
        filter((x) => !!x),
        toArray()
      ) as Observable<ClanConfigMembers[]>;
    })
  );

  clanProfiles$: Observable<ClanMemberProfile[]> = this.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          return this.profileService
            .getSerializedProfilesFromCache(clanAndMembers.clan.clanId, clanAndMembers.members, [], [], [])
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
              })
            );
        }),
        toArray()
      );
    })
  );

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private profileService: ProfileService
  ) {}
}
