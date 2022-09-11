import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from './config/app-config';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: AppConfig, useValue: environment }],
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
