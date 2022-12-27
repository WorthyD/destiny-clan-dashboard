import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesDashboardComponent } from './activities-dashboard.component';
import { ActivitiesDashboardRoutingModule } from './activities-dashboard-routes.module';
import { ActivityCardDetailsComponent } from '../components/activity-card-details/activity-card-details.component';

@NgModule({
  declarations: [ActivitiesDashboardComponent],
  imports: [CommonModule, ActivityCardDetailsComponent, ActivitiesDashboardRoutingModule]
})
export class ActivitiesDashboardModule {}
