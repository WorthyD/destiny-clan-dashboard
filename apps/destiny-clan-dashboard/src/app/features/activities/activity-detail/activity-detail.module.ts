import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailComponent } from './activity-detail.component';
import { ActivityDetailRoutingModule } from './activity-detail-routes.module';

import { CollapsibleListComponent } from '@destiny-clan-dashboard/components/shared/collapsible-list';
import { MatButtonModule } from '@angular/material/button';
import { ActivityTableModule } from '../activity-table/activity-table.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ActivityDetailComponent],
  imports: [
    CommonModule,
    CollapsibleListComponent,
    ActivityDetailRoutingModule,
    MatButtonModule,
    ActivityTableModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class ActivityDetailModule {}
