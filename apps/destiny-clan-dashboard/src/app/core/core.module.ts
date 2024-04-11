import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
///import { AppConfig } from './config/app-config';
import { AppConfigService } from '@dcd/shared/utils/app-config';
import { environment } from '../../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './interceptors/apikey.interceptor';
import { StoreModule } from '@ngrx/store';
import { coreReducers, coreEffects, metaReducers } from './core.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Configuration } from 'bungie-api-angular';
import { ClanDbModule } from '@destiny-clan-dashboard/data/clan';
import { IdbKeyValService } from '@destiny-clan-dashboard/data/storage';
import { LayoutModule } from './layout/layout.module';
import { ClanMembersService } from '@destiny-clan-dashboard/data/clan/clan-members';
//import { ClanProfileService } from 'libs/data/src/lib/clan/profiles/profile.service';
import { ClanProfileService } from '@destiny-clan-dashboard/data/clan/profiles/profile.service';
import { ClanDatabase } from '@destiny-clan-dashboard/data/clan/clan-database';
import { locationProvider, LocationToken, windowProvider, WindowToken } from '@dcd/shared/tokens';

import { MatDialogModule } from '@angular/material/dialog';
import { ClanBungieInfoService } from '@destiny-clan-dashboard/data/clan/bungie-info/bungie-info.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ClanDbModule,
    LayoutModule,
    MatDialogModule,
    //StoreModule.forRoot(coreReducers, { metaReducers }),
   // StoreModule.forFeature( coreReducers, { metaReducers }),
    //EffectsModule.forRoot(coreEffects),
    //EffectsModule.forRoot(coreEffects),
  //  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    ClanMembersService,
    IdbKeyValService,
    { provide: LocationToken, useFactory: locationProvider },
    { provide: WindowToken, useFactory: windowProvider },
    {
      provide: ClanProfileService,
      useFactory: (canDB) => {
        return new ClanProfileService(canDB, environment.apiKey);
      },
      deps: [ClanDatabase]
    },
    {
      provide: ClanBungieInfoService,
      useFactory: (canDB) => {
        return new ClanBungieInfoService(canDB, environment.apiKey);
      },
      deps: [ClanDatabase]
    },
  //  { provide: AppConfig, useValue: environment },
    // {
    //   provide: Configuration,
    //   useFactory: () => new Configuration(
    //     {

    //       //basePath: environment.apiUrl,
    //       //accessToken: authService.getAccessToken.bind(authService)
    //     }
    //   ),
    //   multi: false
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
