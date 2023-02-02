import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from './config/app-config';
import { environment } from '../../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './interceptors/apikey.interceptor';
import { StoreModule } from '@ngrx/store';
import { coreReducers, coreEffects, metaReducers } from './core.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Configuration } from 'bungie-api-angular';
import { ClanDbModule } from '@destiny/data/clan';
import { IdbKeyValService } from '@destiny/data/storage';
import { LayoutModule } from './layout/layout.module';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { locationProvider, LocationToken } from './injection-tokens/location-token';
import { MatDialogModule } from '@angular/material/dialog';
import { windowProvider, WindowToken } from 'projects/data/src/lib/injection-tokens/window-token';
import { BungieInfoService } from 'projects/data/src/lib/clan/bungie-info/bungie-info.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ClanDbModule,
    LayoutModule,
    MatDialogModule,
    StoreModule.forRoot(coreReducers, { metaReducers }),
    EffectsModule.forRoot(coreEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    ClanMembersService,
    IdbKeyValService,
    { provide: LocationToken, useFactory: locationProvider },
    { provide: WindowToken, useFactory: windowProvider },
    {
      provide: ProfileService,
      useFactory: (canDB) => {
        return new ProfileService(canDB, environment.apiKey);
      },
      deps: [ClanDatabase]
    },
    {
      provide: BungieInfoService,
      useFactory: (canDB) => {
        return new BungieInfoService(canDB, environment.apiKey);
      },
      deps: [ClanDatabase]
    },
    { provide: AppConfig, useValue: environment },
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
