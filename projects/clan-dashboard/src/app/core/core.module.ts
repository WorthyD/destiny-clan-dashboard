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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ClanDbModule,
    StoreModule.forRoot(coreReducers, { metaReducers }),
    EffectsModule.forRoot(coreEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
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