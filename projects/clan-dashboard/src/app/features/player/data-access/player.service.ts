import { Injectable } from '@angular/core';
import { PlayerShellModule } from '../player-shell/player-shell.module';
import { CachedProfileService } from '@destiny/data/profile';

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
