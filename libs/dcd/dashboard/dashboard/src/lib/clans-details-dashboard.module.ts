import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansDetailsDashboardComponent } from './clans-details-dashboard.component';
//import { ClansDetailsModule } from '../clans-details/clans-details.module';
import { ClansDetailsModule } from '@dcd/dashboard/details';
import { ClansDetailsRoutingModule } from './clans-details-dashboard-routing.module';
// import { ClansHighestLightLevelCardModule } from '../clans-highest-light-level-card/clans-highest-light-level-card.module';
// import { ClansRecentlyActiveCardModule } from '../../../../../../../libs/dcd/dashboard/cards/src/lib/clans-recently-active-card/clans-recently-active-card.module';
// import { ClansInactiveCardModule } from '../../../../../../../libs/dcd/dashboard/cards/src/lib/clans-inactive-card/clans-inactive-card.module';
// import { ClansActivityCardModule } from '../../../../../../../libs/dcd/dashboard/cards/src/lib/clans-activity-card/clans-activity-card.module';
// import { ClansHighestSeasonPassLevelCardModule } from '../../../../../../../libs/dcd/dashboard/cards/src/lib/clans-highest-season-pass-level-card/clans-highest-season-pass-level-card.module';
import {
  ClansActivityCardModule,
  //  ClansHighestLightLevelCardModule,
  ClansHighestSeasonPassLevelCardModule,
  ClansInactiveCardModule,
  ClansRecentlyActiveCardModule
} from '@dcd/dashboard/cards';

@NgModule({
  declarations: [ClansDetailsDashboardComponent],
  imports: [
    CommonModule,
    ClansDetailsModule,
    ClansDetailsRoutingModule,
    ClansHighestSeasonPassLevelCardModule,
    //ClansHighestLightLevelCardModule,
    ClansRecentlyActiveCardModule,
    ClansInactiveCardModule,
    ClansActivityCardModule
  ]
})
export class ClansDetailsDashboardModule {}
