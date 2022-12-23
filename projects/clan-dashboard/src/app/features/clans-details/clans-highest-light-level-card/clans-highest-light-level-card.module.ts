import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansHighestLightLevelCardComponent } from './clans-highest-light-level-card.component';

import { ClanMemberCardComponent } from '../components/clan-member-card/clan-member-card.component';

@NgModule({
  declarations: [ClansHighestLightLevelCardComponent],
  exports: [ClansHighestLightLevelCardComponent],
  imports: [CommonModule, ClanMemberCardComponent]
})
export class ClansHighestLightLevelCardModule {}
