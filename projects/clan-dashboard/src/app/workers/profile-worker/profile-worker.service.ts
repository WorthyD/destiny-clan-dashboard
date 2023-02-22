import { Injectable } from '@angular/core';
//import { MemberProfile, ClanMember } from 'bungie-models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MemberProfile } from '@destiny/data/models';
import { SeasonService } from '@core/services/season.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileWorkerService {
  constructor(private seasonService:SeasonService) {}
  //  members: BehaviorSubject<MemberProfile[]> = new BehaviorSubject([]);
  //members: BehaviorSubject<any[]> = new BehaviorSubject([]);

  // loadProfiles(clanId: string, clanMembers: ClanMember[], progress?: (done) => any): void {
  loadProfiles(clanId: string, clanMembers: any[], progress?: (done) => any): Observable<MemberProfile[]> {
    // const activityCacheComplete: Subject<boolean> = new Subject();
    const members: BehaviorSubject<MemberProfile[]> = new BehaviorSubject([]);

    const worker = new Worker(new URL('./profile.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      if (data.type === 'progress') {
        progress(data.data);
      } else if (data.type === 'complete') {
        members.next(data.data);
        //activityCacheComplete.next(true);
      }
    };

    worker.postMessage({
      clanId,
      clanMembers,
      progressionHashes: this.seasonService.getSeasonProgressionHashes(),
      apiKey: environment.apiKey
    });
    return members;
  }
}
