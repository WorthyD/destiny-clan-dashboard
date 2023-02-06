import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SealDetailsComponent } from './seal-details.component';
import { SealsDashboardRoutingModule } from './seal-detail-routing.module';
import { TableViewComponent } from '@destiny/components/shared/table-view';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SealDetailsComponent],
  imports: [CommonModule, SealsDashboardRoutingModule, TableViewComponent, MatIconModule, MatButtonModule, RouterModule]
})
export class SealDetailsModule {}
