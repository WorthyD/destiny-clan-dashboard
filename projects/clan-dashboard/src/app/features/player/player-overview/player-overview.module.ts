import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerOverviewComponent } from './player-overview.component';
import { ClansDetailsRoutingModule } from './player-overview-routes.module';
import { MemberOverviewComponent } from '../components/member-overview/member-overview.component';

@NgModule({
  declarations: [PlayerOverviewComponent],
  imports: [CommonModule, ClansDetailsRoutingModule, MemberOverviewComponent]
})
export class PlayerOverviewModule {}
