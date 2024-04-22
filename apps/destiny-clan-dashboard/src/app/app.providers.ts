import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { coreEffects, coreReducers, metaReducers } from '@dcd/shared/data-access/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAppConfigProvider, AppConfigService } from '@dcd/shared/utils/app-config';
import { appConfig } from './app.config';
import { SealsModule } from '@dcd/shared/data-access/seals';
import { BungieInfoWorkerService as BungieInfoWorkerServiceFake } from '@dcd/shared/data-access/bungie-info';
import { BungieInfoWorkerService } from './workers/bungie-info/bungie-info-worker.service';

export const appProviders: ApplicationConfig = {
  providers: [
    { provide: BungieInfoWorkerServiceFake, useClass: BungieInfoWorkerService },
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(CoreModule, SealsModule, BrowserAnimationsModule),
    provideStore(coreReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }).providers,
    provideEffects(coreEffects),
    getAppConfigProvider(appConfig),
    AppConfigService
  ]
};
