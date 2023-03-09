import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDashboardComponent } from './activity-dashboard.component';
import { ActivitiesDashboardRoutingModule } from './activity-dashboard-routes.module';

@NgModule({
  declarations: [ActivityDashboardComponent],
  imports: [CommonModule, ActivitiesDashboardRoutingModule]
})
export class ActivityDashboardModule {}
