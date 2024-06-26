import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';
import { AppConfig } from './app-config.interface';

describe('AppConfigService', () => {
  let service: AppConfigService;
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

  beforeEach(() => {
    service = new AppConfigService(defaultConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return default config', () => {
    expect(service.config).toEqual(defaultConfig);
  });
});
