import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansDetailsDashboardComponent } from './clans-details-dashboard.component';
import { ClansDetailsModule } from '../clans-details/clans-details.module';
import { ClansDetailsRoutingModule } from './clans-details-dashboard-routing.module';
import { ClansHighestLightLevelCardModule } from '../clans-highest-light-level-card/clans-highest-light-level-card.module';
import { ClansRecentlyActiveCardModule } from '../clans-recently-active-card/clans-recently-active-card.module';
import { ClansInactiveCardModule } from '../clans-inactive-card/clans-inactive-card.module';

@NgModule({
  declarations: [ClansDetailsDashboardComponent],
  imports: [
    CommonModule,
    ClansDetailsModule,
    ClansDetailsRoutingModule,
    ClansHighestLightLevelCardModule,
    ClansRecentlyActiveCardModule,
    ClansInactiveCardModule
  ]
})
export class ClansDetailsDashboardModule {}
