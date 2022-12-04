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
              })
            );
        }),
        toArray()
      );
    })
  );

  activeClanPeople$ = this.clanProfiles$;

  constructor(private memberService: ClansMembersService, private profileService: ProfileService) {}
}
