import { Injectable } from '@angular/core';
import { CachedProfileService } from '@destiny-clan-dashboard/data/profile';
@Injectable()
//   {
//   providedIn: PlayerShellModule
//   //   providedIn: 'root'
// }
export class PlayerService {
  constructor(
    private cachedProfileService: CachedProfileService // private cachedProfileService: CachedProfileService
  ) {}

  getProfile(membershipType: string, membershipId: string) {
    return this.cachedProfileService.getProfile(membershipType, membershipId);
  }
}
