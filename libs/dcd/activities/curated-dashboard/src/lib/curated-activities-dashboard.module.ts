import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuratedActivitiesDashboardComponent } from './curated-activities-dashboard.component';
import { CuratedActivitiesDashboardRoutingModule } from './curated-activities-dashboard-routes.module';
import { ActivityCardDetailsComponent } from '@dcd/activities/ui';

@NgModule({
  declarations: [CuratedActivitiesDashboardComponent],
  imports: [CommonModule, ActivityCardDetailsComponent, CuratedActivitiesDashboardRoutingModule]
})
export class CuratedActivitiesDashboardModule {}
