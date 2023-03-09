// import { ActivityStats, MemberProfile, ClanMember } from 'bungie-models';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { ClanDatabase } from '../clan/clan-database';
import { TrackedDuration } from '../clan/clan-member-recent-activity/clan-member-recent-activity.serializer';
import { ClanMemberRecentActivityService } from '../clan/clan-member-recent-activity/clan-member-recent-activity.service';
import { ActivityStats } from '../models/ActivityStats';
// import { ActivityStats } from '../models';
// import { ClanDatabase, ClanMemberRecentActivityService } from '../clan-db';

export class ClanActivityService {
  readonly CONCURRENT_COUNT = 10;
  private memberActivityService: ClanMemberRecentActivityService;
  constructor(private clanDb: ClanDatabase, private apiKey) {
    this.memberActivityService = new ClanMemberRecentActivityService(clanDb, apiKey);
  }

  //getClanActivityStats(clanId: number, clanMemberProfiles: MemberProfile[], activityMode: number = 0) {
  getClanActivityStats(
    clanId: number,
    clanMemberProfiles: any[],
    trackedDates: TrackedDuration[],
    activityMode: number = 0
  ) {
    return from(clanMemberProfiles).pipe(
      mergeMap((member) => {
        return this.getMemberActivityStats(clanId, member, trackedDates, activityMode);
      }, this.CONCURRENT_COUNT),
      toArray()
    );
  }

  private getMemberActivityStats(
    clanId: number,
    member: any,
    trackedDates: TrackedDuration[],
    activityMode: number = 0
  ): Observable<ActivityStats> {
    // private getMemberActivityStats(clanId: number, member: any, activityMode: number = 0): Observable<any> {
    return this.memberActivityService
      .getSerializedProfileActivity(clanId, member, true, trackedDates, activityMode)
      .pipe(
        map((memberActivityResponse) => {
          return {
            memberProfile: { profile: member?.profile },
            stats: memberActivityResponse
          };
        })
      );
    //return of(null);
  }
}
