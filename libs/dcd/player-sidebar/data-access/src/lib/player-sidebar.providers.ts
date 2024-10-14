import { Provider } from '@angular/core';
import { CachedProfileService } from '@dcd/shared/data-access/profile';
import { AppConfigService } from '@dcd/shared/utils/app-config';
import { IdbKeyValService } from '@dcd/shared/utils/storage';
import { PlayerService } from './player.service';
import { PlayerSidebarStore } from './player-store';

export const providePlayerSidebar: () => Provider[] = () => [
  //PlayerSidebarStore,
  //PlayerService,
  {
    provide: CachedProfileService,
    useFactory: (store: IdbKeyValService, config: AppConfigService) => {
      return new CachedProfileService(store, config.config.apiKey);
    },
    deps: [IdbKeyValService, AppConfigService]
  }
];
