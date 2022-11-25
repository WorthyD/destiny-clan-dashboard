import { Injectable } from '@angular/core';
import { MemberProfile } from 'projects/data/src/lib/models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileRecentActivityWorkerService {
  constructor() {}
  updateAllRecentActivityCache(clanId: string, clanMembers: any[], progress?: (done) => any): Observable<boolean> {
    const activityCacheComplete: Subject<boolean> = new Subject();
    const worker = new Worker(new URL('./profile-recent-activity-updater.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      if (data.type === 'progress') {
        progress(data.data);
      } else if (data.type === 'complete') {
        activityCacheComplete.next(true);
      }
    };

    worker.postMessage({
      clanId,
      clanMembers,
      apiKey: environment.apiKey
    });
    return activityCacheComplete;
  }

  //getAllRecentActivitiesFromCache(clanId: string, memberProfiles: MemberProfile[]): Observable<any> {
  getAllRecentActivitiesFromCache(clanId: string, memberProfiles: any[]): Observable<any> {
    const memberActivities = new Subject();
    const worker = new Worker(new URL('./profile-recent-activity-getter.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      memberActivities.next(data.data);
    };

    worker.postMessage({
      clanId,
      memberProfiles,
      apiKey: environment.apiKey
    });
    return memberActivities;
  }

  getAllRecentClanActivitiesByActivityId(clanId: string, memberProfiles: MemberProfile[], activityId: number): Observable<any> {
    const memberActivities = new Subject();
    const worker = new Worker(new URL('./clan-activity-recent-activity-getter.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      memberActivities.next(data.data);
    };

    worker.postMessage({
      clanId,
      memberProfiles,
      apiKey: environment.apiKey,
      activityId
    });
    return memberActivities;
  }
}
