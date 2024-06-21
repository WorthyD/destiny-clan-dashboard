import { Injectable } from '@angular/core';
//import { ClanConfigMembers } from '@dcd/shared/models';
//import { MemberProfile } from 'projects/data/src/lib/models';
// import { AggregateType } from 'libs/data/src/lib/stat-aggregators/clan-aggregate-time';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable()
export class ProfileRecentActivityWorkerService {
  constructor() {}
  updateAllRecentActivityCache(
    clanId: string,
    clanMembers: any[],
    progress?: (done: unknown) => any
  ): Observable<boolean> {
    throw new Error('not implemented');
  }

  //getAllRecentActivitiesFromCache(clanId: string, memberProfiles: MemberProfile[]): Observable<any> {
  getAllRecentActivitiesFromCache(clanId: string, memberProfiles: any[]): Observable<any> {
    throw new Error('not implemented');
  }

  // getAllActivities(
  //   clansAndMembers: ClanConfigMembers[],
  //   statAggregatorType: AggregateType,
  //   activityModeId: number,
  //   activityTypeId: number
  // ): Observable<any> {
  getAllActivities(
    clansAndMembers: unknown[],
    statAggregatorType: unknown,
    activityModeId: number,
    activityTypeId: number
  ): Observable<any> {
    throw new Error('not implemented');
  }

  getAllRecentClanActivitiesByActivityModeId(
    clansAndMembers: unknown[],
    trackedDates: unknown[],
    activityModeId: number,
    activityTypeId: number
  ): Observable<any> {
    throw new Error('not implemented');
  }
}
