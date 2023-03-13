import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerOverviewComponent } from './player-overview.component';
import { ClansDetailsRoutingModule } from './player-overview-routes.module';

@NgModule({
  declarations: [PlayerOverviewComponent],
  imports: [CommonModule, ClansDetailsRoutingModule]
})
export class PlayerOverviewModule {}
