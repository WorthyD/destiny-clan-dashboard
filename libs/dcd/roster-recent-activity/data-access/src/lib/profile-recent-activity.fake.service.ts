import { Injectable } from '@angular/core';
import { ClanConfigMembers } from '@dcd/shared/models';
//import { MemberProfile } from 'projects/data/src/lib/models';
import { Observable, of, Subject } from 'rxjs';
import { AggregateType } from '@dcd/shared/utils/stat-aggregators';
import { TrackedDuration } from '@dcd/shared/utils/serializers';
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

  getAllRecentActivitiesFromCache(clanId: string, memberProfiles: any[]): Observable<any> {
    throw new Error('not implemented');
  }
  getAllActivities(
    clansAndMembers: ClanConfigMembers[],
    statAggregatorType: AggregateType,
    activityModeId: number,
    activityTypeId: number
  ): Observable<any> {
    throw new Error('not implemented');
  }

  getAllRecentClanActivitiesByActivityModeId(
    clansAndMembers: ClanConfigMembers[],
    trackedDates: TrackedDuration[],
    activityModeId: number,
    activityTypeId: number
  ): Observable<any> {
    throw new Error('not implemented');
  }
}
