import { AppConfig } from './app-config.interface';

export const MockConfig: AppConfig = {
  apiKey: '',
  appVersion: '',
  production: false,
  useMocks: true,
  constants: {
    PROFILE_UPDATING_EXP_MINUTES: 10,
    D2DASHBOARD_ACKNOWLEDGE_OFFLINE: '',
    CURRENT_SEALS_HASH: 0,
    LEGACY_SEALS_HASH: 0,
    MEMBER_RECENT_ACTIVITY_EXP_MINUTES: 0
  }
};
