import { Injectable } from '@angular/core';
import { PlayerShellModule } from '../player-shell/player-shell.module';
import { CachedProfileService } from '@destiny-clan-dashboard/data/profile';
import { AppConfig } from '@core/config/app-config';

@Injectable()
//   {
//   providedIn: PlayerShellModule
//   //   providedIn: 'root'
// }
export class PlayerService {
  constructor(
    private cachedProfileService: CachedProfileService // private cachedProfileService: CachedProfileService
    ,
    private appConfig: AppConfig
  ) {}

  getProfile(membershipType: string, membershipId: string) {
    return this.cachedProfileService.getProfile(membershipType, membershipId);
  }
}
