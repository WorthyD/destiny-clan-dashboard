import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityModeDashboardComponent } from './activity-mode-dashboard.component';
import { ActivityModeDashboardRoutingModule } from './activity-dashboard-routes.module';
import { ActivityModeCardDetailsComponent } from '../components/activity-mode-card-details/activity-mode-card-details.component';

@NgModule({
  declarations: [ActivityModeDashboardComponent],
  imports: [CommonModule, ActivityModeDashboardRoutingModule, ActivityModeCardDetailsComponent]
})
export class ActivityModeDashboardModule {}
