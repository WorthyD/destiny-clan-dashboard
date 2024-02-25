import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTableComponent } from './activity-table.component';
import { TableViewComponent } from '@destiny-clan-dashboard/components/shared/table-view';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ActivitiesTableRoutingModule } from './activity-table-routes.module';
@NgModule({
  declarations: [ActivityTableComponent],
  exports: [ActivityTableComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TableViewComponent,
    RouterModule,
    ActivitiesTableRoutingModule
  ]
})
export class ActivityTableModule {}
