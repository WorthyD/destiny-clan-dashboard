import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { coreEffects, coreReducers, metaReducers } from '@dcd/shared/data-access/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAppConfigProvider, AppConfigService } from '@dcd/shared/utils/app-config';
import { appConfig } from './app.config';
import { SealsModule } from '@dcd/shared/data-access/seals';
import { BungieInfoWorkerService as BungieInfoWorkerServiceFake } from '@dcd/shared/data-access/bungie-info';
import { BungieInfoWorkerService } from './workers/bungie-info/bungie-info-worker.service';

import { ProfileWorkerService as ProfileWorkerServiceFake } from '@dcd/shared/data-access/profile';
import { ProfileWorkerService } from './workers/profile-worker/profile-worker.service';

import { ProfileRecentActivityWorkerService as ProfileRecentActivityWorkerServiceFake } from '@dcd/shared/data-access/member-activity';
import { ProfileRecentActivityWorkerService } from './workers/profile-recent-activity/profile-recent-activity.service';
import { LocationToken, WindowToken, locationProvider, windowProvider } from '@dcd/shared/tokens';
import { IdbKeyValService } from '@dcd/shared/utils/storage';
import { ClanMembersService } from '@destiny-clan-dashboard/data/clan/clan-members';
import { ApiKeyInterceptor } from '@dcd/shared/utils/api-key-interceptor';
import { ClanDatabase } from '@destiny-clan-dashboard/data/clan/clan-database';
import { ClanBungieInfoService } from '@destiny-clan-dashboard/data/clan/bungie-info/bungie-info.service';
import { ClanProfileService } from '@destiny-clan-dashboard/data/clan/profiles/profile.service';
import { ClanDbModule } from '@destiny-clan-dashboard/data/clan';
import { ProfileRecentActivityWorkerService as ProfileRecentActivityWorkerServiceFakeSecond } from '@dcd/roster-recent-activity/data-access';
import { ProfileRecentActivityWorkerService as ProfileRecentActivityWorkerServiceFakeThird } from '@dcd/activity-modes/data-access';
import { ProfileRecentActivityWorkerService as ProfileRecentActivityWorkerServiceFakeFourth } from '@dcd/activities/data-access';
import { ProfileRecentActivityWorkerService as ProfileRecentActivityWorkerServiceFakeFifth } from '@dcd/dashboard/data-access';

export const appProviders: ApplicationConfig = {
  providers: [
    // Routes
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    // Custom providers
    { provide: BungieInfoWorkerServiceFake, useClass: BungieInfoWorkerService },
    { provide: ProfileWorkerServiceFake, useClass: ProfileWorkerService },
    { provide: ProfileRecentActivityWorkerServiceFake, useClass: ProfileRecentActivityWorkerService },
    { provide: ProfileRecentActivityWorkerServiceFakeSecond, useClass: ProfileRecentActivityWorkerService },
    { provide: ProfileRecentActivityWorkerServiceFakeThird, useClass: ProfileRecentActivityWorkerService },
    { provide: ProfileRecentActivityWorkerServiceFakeFourth, useClass: ProfileRecentActivityWorkerService },
    { provide: ProfileRecentActivityWorkerServiceFakeFifth, useClass: ProfileRecentActivityWorkerService },
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    },

    // Imported Providers
    importProvidersFrom(HttpClientModule, ClanDbModule, SealsModule, BrowserAnimationsModule),

    // NGRX Providers
    provideStore(coreReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }).providers,
    provideEffects(coreEffects),

    //Tokens
    getAppConfigProvider(appConfig),
    { provide: LocationToken, useFactory: locationProvider },
    { provide: WindowToken, useFactory: windowProvider },

    // Standard providers
    AppConfigService,
    IdbKeyValService,
    ClanMembersService
  ]
};
