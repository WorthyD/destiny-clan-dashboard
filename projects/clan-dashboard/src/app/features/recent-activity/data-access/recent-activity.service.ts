import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClanIds, selectEnabledClans, selectLastRecentActivityUpdate } from '@core/store/clans';
import { combineLatest, from, map, mergeMap, Observable, switchMap, take, tap, toArray } from 'rxjs';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { MemberProfile } from '@destiny/data/models';
import { getClanMemberId, getMemberProfileId } from '@destiny/data/utility';
import { ProfileRecentActivityWorkerService } from '../../../workers/profile-recent-activity/profile-recent-activity.service';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ProfileRecentActivity } from '../models/profile-recent-activity';
import { RecentActivityModule } from '../recent-activity-shell/recent-activity.module';

import { ClansMembersService } from '@core/services/clans-members.service';

@Injectable({
  providedIn: RecentActivityModule
})
export class RecentActivityService {

  activeClanActivity$: Observable<ProfileRecentActivity[]> = this.memberService.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {

          return this.profileService
            .getSerializedProfilesFromCache(clanAndMembers.clan.clanId, clanAndMembers.members, [], [])
            .pipe(
              switchMap((memberProfiles) => {

                return this.profileActivityService
                  .getAllRecentActivitiesFromCache(clanAndMembers.clan.clanId, memberProfiles)
                  .pipe(
                    take(1),
                    map((clanActivities) => {
                      return clanAndMembers.members.map((member) => {
                        return {
                          clanMember: member,
                          profileActivity: clanActivities.find(
                            (ca) => getMemberProfileId(ca.memberProfile) === getClanMemberId(member)
                          ),
                          profile: memberProfiles.find((m) => getMemberProfileId(m) === getClanMemberId(member)),
                          clan: {
                            clanId: clanAndMembers.clan.clanId,
                            clanName: clanAndMembers.clan.clanName,
                            clanTag: clanAndMembers.clan.clanTag
                          }
                        };
                      });


                    })
                  );
              })

            );
        }),
        toArray(),
        map((x) => x.flatMap((y) => y))
      );
    })
  );


  constructor(
    private memberService: ClansMembersService,
    private profileService: ProfileService,
    private profileActivityService: ProfileRecentActivityWorkerService
  ) {}
}
