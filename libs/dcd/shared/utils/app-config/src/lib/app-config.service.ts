import { Inject, Injectable } from '@angular/core';
import { AppConfig } from './app-config.interface';
import { APP_CONFIG } from './app-config.token';

@Injectable()
export class AppConfigService {
  readonly config: AppConfig;

  constructor(@Inject(APP_CONFIG) private readonly inConfig: AppConfig) {
    this.config = this.inConfig;
  }
}
