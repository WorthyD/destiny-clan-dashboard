import { Injectable } from '@angular/core';
import { ClanConfigMembers } from '@core/services/clans-members.service';
import { TrackedDuration } from 'libs/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.serializer';
//import { MemberProfile } from 'projects/data/src/lib/models';
import { AggregateType } from 'libs/data/src/lib/stat-aggregators/clan-aggregate-time';
import { Observable, of, Subject } from 'rxjs';

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
