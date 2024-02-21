import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { ClanConfigComponent } from './clan-config/clan-config.component';
import { ClanDetailsModule } from '../clan-details/clan-details.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfigComponent, ClanConfigComponent],
  exports: [ConfigComponent],
  imports: [CommonModule, ClanDetailsModule, MatButtonModule]
})
export class ConfigModule {}
