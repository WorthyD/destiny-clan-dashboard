import { TestBed } from '@angular/core/testing';
import { APP_CONFIG, getAppConfigProvider } from './app-config.token';

import { AppConfig } from './app-config.interface';

describe('AppConfigService', () => {
  const defaultConfig: AppConfig = {
    apiKey: '1234',
    appVersion: '1.0.0',
    constants: {
      CURRENT_SEALS_HASH: 0,
      D2DASHBOARD_ACKNOWLEDGE_OFFLINE: '',
      LEGACY_SEALS_HASH: 0,
      MEMBER_RECENT_ACTIVITY_EXP_MINUTES: 0,
      PROFILE_UPDATING_EXP_MINUTES: 0
    },
    production: false,
    useMocks: false
  };
  let providedConfig: AppConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [getAppConfigProvider(defaultConfig)]
    });
    providedConfig = TestBed.inject(APP_CONFIG);
  });

  it('should be created', () => {
    expect(providedConfig).toBeTruthy();
  });
  it('should be have value', () => {
    expect(providedConfig).toEqual(defaultConfig);
  });
});
