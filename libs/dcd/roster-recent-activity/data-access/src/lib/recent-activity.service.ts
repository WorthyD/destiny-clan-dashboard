import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable, switchMap, take, toArray } from 'rxjs';
// import { ClanProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { getClanMemberId, getMemberProfileId } from '@dcd/shared/utils';
import { ProfileRecentActivityWorkerService } from './profile-recent-activity.fake.service';

//import { ProfileRecentActivity } from '../models/profile-recent-activity';
import { ProfileRecentActivity } from '@dcd/roster-recent-activity/models';

///import { RecentActivityModule } from '../recent-activity-shell/recent-activity.module';

import { SeasonService } from '@dcd/shared/data-access/definitions';
import { ClanProfileService } from '@dcd/shared/data-access/clan-collections';
import { Store } from '@ngrx/store';
import { selectAllClansWithMembers } from '@dcd/shared/data-access/store';
// import { SeasonService } from '@core/services/season.service';

@Injectable()
export class RecentActivityService {
  clanMembers$ = this.store.select(selectAllClansWithMembers);

  // TODO: Optimize this to work with store better.
  // @ts-ignore
  activeClanActivity$: Observable<ProfileRecentActivity[]> = this.clanMembers$.pipe(
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
                            (ca: any) => getMemberProfileId(ca.memberProfile) === getClanMemberId(member)
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
    //private memberService: ClansMembersService,

    private store: Store,
    private profileService: ClanProfileService,
    private profileActivityService: ProfileRecentActivityWorkerService,
    private seasonService: SeasonService
  ) {}
}
