import { AppConfig } from '@dcd/shared/utils/app-config';
import { environment } from '../environments/environment';

export const appConfig: AppConfig = {
  apiKey: environment.apiKey,
  appVersion: environment.appVersion,
  production: environment.production,
  useMocks: false,
  constants: {
    D2DASHBOARD_ACKNOWLEDGE_OFFLINE: 'D2DASHBOARD_ACKNOWLEDGE_OFFLINE',
    PROFILE_UPDATING_EXP_MINUTES: 180,
    MEMBER_RECENT_ACTIVITY_EXP_MINUTES: 360,
    CURRENT_SEALS_HASH: 616318467,
    LEGACY_SEALS_HASH: 1881970629
  }
};
