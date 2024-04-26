import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailComponent } from './activity-detail.component';
import { ActivityDetailRoutingModule } from './activity-detail-routes.module';

import { CollapsibleListComponent } from '@dcd/shared/ui/collapsible-list';
import { MatButtonModule } from '@angular/material/button';
//import { ActivityTableModule } from '../activity-table/activity-table.module';
//import { ActivityTableModule } from '@dcd/activities/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ActivityDetailComponent],
  imports: [
    CommonModule,
    CollapsibleListComponent,
    ActivityDetailRoutingModule,
    MatButtonModule,
 //   ActivityTableModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class ActivityDetailModule {}
