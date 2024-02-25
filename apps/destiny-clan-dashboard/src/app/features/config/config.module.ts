import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { ClanConfigComponent } from './clan-config/clan-config.component';
import { MatButtonModule } from '@angular/material/button';
import { ClanDetailComponent } from '@destiny-clan-dashboard/shared/clan-details/feature';

@NgModule({
  declarations: [ConfigComponent, ClanConfigComponent],
  exports: [ConfigComponent],
  imports: [CommonModule, ClanDetailComponent, MatButtonModule]
})
export class ConfigModule {}
