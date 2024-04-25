import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDashboardComponent } from './activity-dashboard.component';
import { ActivitiesDashboardRoutingModule } from './activity-dashboard-routes.module';
//import { ActivityBreakdownListModule } from '../activity-breakdown-list/activity-breakdown-list.module';
import { ActivityBreakdownListModule } from '@dcd/activities/breakdown-list';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { ActivityTimelineComponent } from '../../../../../../../libs/dcd/activities/ui/src/lib/activity-timeline/activity-timeline.component';
import { ActivityTimelineComponent } from '@dcd/activities/ui';

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
