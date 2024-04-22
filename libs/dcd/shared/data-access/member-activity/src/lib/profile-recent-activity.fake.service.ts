import { Injectable } from '@angular/core';
import { ClanConfigMembers } from '@dcd/shared/models';
import { TrackedDuration } from 'libs/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.serializer';
import { AggregateType } from 'libs/data/src/lib/stat-aggregators/clan-aggregate-time';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileRecentActivityWorkerService {
  constructor() {}
  updateAllRecentActivityCache(clanId: string, clanMembers: any[], progress?: (done: any) => any): Observable<boolean> {
    throw new Error('Not implemented');
  }

  //getAllRecentActivitiesFromCache(clanId: string, memberProfiles: MemberProfile[]): Observable<any> {
  getAllRecentActivitiesFromCache(clanId: string, memberProfiles: any[]): Observable<any> {
    throw new Error('Not implemented');
  }
  getAllActivities(
    clansAndMembers: ClanConfigMembers[],
    statAggregatorType: AggregateType,
    activityModeId: number,
    activityTypeId: number
  ): Observable<any> {
    throw new Error('Not implemented');
  }

  getAllRecentClanActivitiesByActivityModeId(
    clansAndMembers: ClanConfigMembers[],
    trackedDates: TrackedDuration[],
    activityModeId: number,
    activityTypeId: number
  ): Observable<any> {
    throw new Error('Not implemented');
  }
}
