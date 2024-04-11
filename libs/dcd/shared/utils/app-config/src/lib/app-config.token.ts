import { InjectionToken, ValueProvider } from '@angular/core';
import { AppConfig } from './app-config.interface';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: value
});
