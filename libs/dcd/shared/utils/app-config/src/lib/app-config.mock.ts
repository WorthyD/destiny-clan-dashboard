import { AppConfig } from './app-config.interface';

export const MockConfig: AppConfig = {
  apiKey: '',
  appVersion: '',
  production: false,
  useMocks: true,
  constants: {
    PROFILE_UPDATING_EXP_MINUTES: 10
  }
};
