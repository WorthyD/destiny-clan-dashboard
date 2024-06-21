import { Injectable } from '@angular/core';
import { ClanConfigMembers } from '@dcd/shared/models';
import { Observable } from 'rxjs';
import { AggregateType } from '@dcd/shared/utils/stat-aggregators';
import { TrackedDuration } from '@dcd/shared/utils/serializers';

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
