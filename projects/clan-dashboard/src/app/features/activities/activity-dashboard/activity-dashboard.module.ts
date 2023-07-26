import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDashboardComponent } from './activity-dashboard.component';
import { ActivitiesDashboardRoutingModule } from './activity-dashboard-routes.module';
import { ActivityBreakdownListModule } from '../activity-breakdown-list/activity-breakdown-list.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivityTimelineComponent } from '../components/activity-timeline/activity-timeline.component';

@NgModule({
  declarations: [ActivityDashboardComponent],
  imports: [
    CommonModule,
    ActivitiesDashboardRoutingModule,
    ActivityBreakdownListModule,
    MatToolbarModule,
    ActivityTimelineComponent
  ]
})
export class ActivityDashboardModule {}
