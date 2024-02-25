import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { ConfigRoutingModule } from './config-routing.module';
// import { ConfigModule as ConfigFeatureModule } from '../../features/config/config.module';

@NgModule({
  declarations: [ConfigComponent],
  imports: [CommonModule, ConfigRoutingModule]
})
export class ConfigModule {}
