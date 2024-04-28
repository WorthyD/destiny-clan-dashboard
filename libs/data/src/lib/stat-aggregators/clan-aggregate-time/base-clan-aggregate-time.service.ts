// import { Injectable } from '@angular/core';
// import { ActivityStats, MemberProfile, MemberActivityTime } from 'bungie-models';
// import { ActivityStats } from 'projects/bungie-models/src/lib/models/ActivityStats';
// import { MemberActivityTime } from 'projects/bungie-models/src/lib/models/MemberActivityTime';
// import { MemberProfile } from 'projects/bungie-models/src/lib/models/MemberProfile';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ClanDatabase } from '../../clan/clan-database';
import { ClanMemberRecentActivityService } from '../../clan/clan-member-recent-activity/clan-member-recent-activity.service';
// import {  MemberProfile } from '../../models/MemberProfile';
import { MemberActivityTime } from '@dcd/shared/models';
// import { AppConfig } from 'src/app/app.config';
// import { ClanMemberRecentActivityService } from '../../clan-db/clan-member-recent-activity/clan-member-recent-activity.service';
// import { ClanDatabase } from '../../clan-db/ClanDatabase';
// import { ClanMemberRecentActivityService, ClanDatabase } from '../../clan-db';
interface MemberProfile {
  profile: any;
}

export abstract class BaseClanAggregateTimeService {
  readonly CONCURRENT_COUNT = 10;
  private memberActivityService: ClanMemberRecentActivityService;
  constructor(private clanDb: ClanDatabase, private apiKey: string) {
    this.memberActivityService = new ClanMemberRecentActivityService(clanDb, apiKey);
  }

  abstract getClanActivityStatsForDuration(memberActivities: MemberActivityTime[], activityMode, count);

  filterDates(memberActivities: MemberActivityTime[], startDate: Date): MemberActivityTime[] {
    return memberActivities.map((ma) => {
      return {
        id: ma.id,
        activities: ma.activities.filter((x) => x.date > startDate)
      };
    });
  }

  /** @deprecated use gender field instead */
  getClanActivityStats(clanId: number, clanMemberProfiles: MemberProfile[], startDate: Date, activityMode: number = 0) {
    return from(clanMemberProfiles).pipe(
      mergeMap((member) => {
        return this.getMemberActivityStats(clanId, member, startDate, activityMode);
      }, this.CONCURRENT_COUNT)
    );
  }

  /** @deprecated use gender field instead */
  private getMemberActivityStats(
    clanId: number,
    member: MemberProfile,
    startDate: Date,
    activityMode: number = 0
    // TODO: Update
  ): Observable<any> {
    return this.memberActivityService.getMemberActivity(clanId, member, false, activityMode).pipe(
      map((memberActivityResponse) => {
        return {
          memberProfile: { profile: member.profile },
          stats: {
            id: memberActivityResponse.id,
            activities: memberActivityResponse.activities.filter((x) => new Date(x.period) > startDate)
          }
        };
      })
    );
  }
}
