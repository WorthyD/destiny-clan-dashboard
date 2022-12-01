import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SealDetailsComponent } from './seal-details.component';
import { SealsDashboardRoutingModule } from './seal-detail-routing.module';
import { TableViewComponent } from '@destiny/components/shared/table-view';

@NgModule({
  declarations: [SealDetailsComponent],
  imports: [CommonModule, SealsDashboardRoutingModule, TableViewComponent]
})
export class SealDetailsModule {}
