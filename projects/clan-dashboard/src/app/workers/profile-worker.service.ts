import { Injectable } from '@angular/core';
//import { MemberProfile, ClanMember } from 'bungie-models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { MemberProfile } from '@destiny/data/models';

@Injectable({
  providedIn: 'root'
})
export class ProfileWorkerService {
  constructor() {}
  members: BehaviorSubject<MemberProfile[]> = new BehaviorSubject([]);
  //members: BehaviorSubject<any[]> = new BehaviorSubject([]);

  // loadProfiles(clanId: string, clanMembers: ClanMember[], progress?: (done) => any): void {
  loadProfiles(clanId: string, clanMembers: any[], progress?: (done) => any): void {
    console.log('url', import.meta.url);
    const worker = new Worker(new URL('./profile.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      if (data.type === 'progress') {
        progress(data.data);
      } else if (data.type === 'complete') {
        this.members.next(data.data);
      }
    };

    worker.postMessage({
      clanId,
      clanMembers,
      apiKey: environment.apiKey
    });
  }
}
