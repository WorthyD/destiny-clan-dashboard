import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansHighestLightLevelCardComponent } from './clans-highest-light-level-card.component';

//import { ClanMemberCardComponent } from '../../../../ui/src/lib/clan-member-card/clan-member-card.component';
import { ClanMemberCardComponent } from '@dcd/dashboard/ui';

@NgModule({
  declarations: [ClansHighestLightLevelCardComponent],
  exports: [ClansHighestLightLevelCardComponent],
  imports: [CommonModule, ClanMemberCardComponent]
})
export class ClansHighestLightLevelCardModule {}
