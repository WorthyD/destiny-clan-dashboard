import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SealDetailsComponent } from './seal-details.component';
import { SealsDashboardRoutingModule } from './seal-detail-routing.module';

@NgModule({
  declarations: [SealDetailsComponent],
  imports: [CommonModule, SealsDashboardRoutingModule]
})
export class SealDetailsModule {}
