import { Injectable } from '@angular/core';
import {  Observable, of, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BungieInfoWorkerService {
  constructor() {}
  updateAllBungieInfoCache(clanId: string, clanMembers: any[], progress?: (done) => any): Observable<boolean> {
    const infoCacheComplete: Subject<boolean> = new Subject();
    const worker = new Worker(new URL('./bungie-info-updater.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      if (data.type === 'progress') {
        progress(data.data);
      } else if (data.type === 'complete') {
        infoCacheComplete.next(true);
      }
    };

    worker.postMessage({
      clanId,
      clanMembers,
      apiKey: environment.apiKey
    });
    return infoCacheComplete;
  }

  getAllActivitiesFromCache(clanId: string, memberProfiles: any[]): Observable<any> {
    const info = new Subject();
    const worker = new Worker(new URL('./bungie-info-getter.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      info.next(data.data);
    };

    worker.postMessage({
      clanId,
      memberProfiles,
      apiKey: environment.apiKey
    });
    return info;
  }
}
