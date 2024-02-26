import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable, switchMap, take, toArray } from 'rxjs';
import { ClanProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { getClanMemberId, getMemberProfileId } from '@@destiny-clan-dashboard/shared/utils';
import { ProfileRecentActivityWorkerService } from '../../../workers/profile-recent-activity/profile-recent-activity.service';
import { ProfileRecentActivity } from '../models/profile-recent-activity';
import { RecentActivityModule } from '../recent-activity-shell/recent-activity.module';

import { ClansMembersService } from '@core/services/clans-members.service';
import { SeasonService } from '@core/services/season.service';

@Injectable({
  providedIn: RecentActivityModule
})
export class RecentActivityService {
  // TODO: Optimize this to work with store better.
  activeClanActivity$: Observable<ProfileRecentActivity[]> = this.memberService.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          return this.profileService
            .getSerializedProfilesFromCache(
              clanAndMembers.clan.clanId,
              clanAndMembers.members,
              this.seasonService.getSeasonProgressionHashes(),
              [],
              [],
              []
            )
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
    private profileService: ClanProfileService,
    private profileActivityService: ProfileRecentActivityWorkerService,
    private seasonService: SeasonService
  ) {}
}
