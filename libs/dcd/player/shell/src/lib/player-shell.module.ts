import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerShellRoutingModule } from './player-shell-routing.module';
//import { PlayerDetailModule } from '../player-detail/player-detail.module';
import { PlayerDetailModule } from '@dcd/player/detail';
import { CachedProfileService } from '@destiny-clan-dashboard/data/profile';
//import { environment } from '../../../../environments/environment';
import { IdbKeyValService } from '@destiny-clan-dashboard/data/storage';
// import { PlayerService } from '../data-access/player.service';
import { PlayerService } from '@dcd/player/data-access';
import { AppConfigService } from '@dcd/shared/utils/app-config';

@NgModule({
  declarations: [],
  providers: [
    PlayerService,
    {
      provide: CachedProfileService,
      useFactory: (store: IdbKeyValService, config: AppConfigService) => {
        return new CachedProfileService(store, config.config.apiKey);
      },
      deps: [IdbKeyValService, AppConfigService]
    }
  ],
  imports: [PlayerShellRoutingModule, PlayerDetailModule]
})
export class PlayerShellModule {}
