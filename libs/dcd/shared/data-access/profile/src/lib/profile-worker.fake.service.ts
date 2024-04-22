import { Injectable } from '@angular/core';
import { MemberProfile } from '@dcd/shared/models';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileWorkerService {
  constructor() {}
  loadProfiles(clanId: string, clanMembers: any[], progress?: (done: any) => any): Observable<MemberProfile[]> {
    throw new Error('Not implemented');
  }
}
