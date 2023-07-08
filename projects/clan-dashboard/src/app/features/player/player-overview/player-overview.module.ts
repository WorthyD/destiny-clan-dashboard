import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerOverviewComponent } from './player-overview.component';
import { ClansDetailsRoutingModule } from './player-overview-routes.module';
import { MemberOverviewComponent } from '../components/member-overview/member-overview.component';
import { PlayerSealsComponent } from '@destiny/components/member/player-seals';
import { BungieInfoComponent } from '@destiny/components/member/bungie-info';

@NgModule({
  declarations: [PlayerOverviewComponent],
  imports: [CommonModule, ClansDetailsRoutingModule, MemberOverviewComponent, PlayerSealsComponent, BungieInfoComponent]
})
export class PlayerOverviewModule {}
