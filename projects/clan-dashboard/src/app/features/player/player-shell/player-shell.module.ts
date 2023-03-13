import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerShellRoutingModule } from './player-shell-routing.module';
import { PlayerDetailModule } from '../player-detail/player-detail.module';
import { CachedProfileService } from '@destiny/data/profile';
import { environment } from '../../../../environments/environment';
import { IdbKeyValService } from '@destiny/data/storage';
import { PlayerService } from '../data-access/player.service';
@NgModule({
  declarations: [],
  providers: [
    PlayerService,
    {
      provide: CachedProfileService,
      useFactory: (store) => {
        return new CachedProfileService(store, environment.apiKey);
      },
      deps: [IdbKeyValService]
    }
  ],
  imports: [PlayerShellRoutingModule, PlayerDetailModule]
})
export class PlayerShellModule {}
