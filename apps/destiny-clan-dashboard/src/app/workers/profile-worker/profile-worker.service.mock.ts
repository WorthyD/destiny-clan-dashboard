import { BehaviorSubject, delay, of, take, tap } from 'rxjs';
import { MemberProfile } from '@dcd/shared/models';

export class ProfileWorkerServiceMock {
  constructor() {}
  members: BehaviorSubject<MemberProfile[]> = new BehaviorSubject([]);

  loadProfiles(clanId: string, clanMembers: any[], progress?: (done) => any): void {
    of(true)
      .pipe(
        delay(10),
        tap(() => progress({ progress: 10 })),
        delay(10),
        tap(() => progress({ progress: 20 })),
        take(1)
      )
      .subscribe(() => {
        this.members.next([{}, {}]);
      });
  }
}
