import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

/**
 * This is a fake service that  we will swap out with depenacy injection in the main application. Web workers can only work in the main
 */
@Injectable()
export class BungieInfoWorkerService {
  constructor() {}
  updateAllBungieInfoCache(clanId: string, clanMembers: any[], progress?: (done: any) => any): Observable<boolean> {
    throw new Error('Not implemented');
  }

  getAllActivitiesFromCache(clanId: string, memberProfiles: any[]): Observable<any> {
    throw new Error('Not implemented');
  }
}
