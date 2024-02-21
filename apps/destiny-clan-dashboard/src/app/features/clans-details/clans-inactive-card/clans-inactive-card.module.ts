import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansInactiveCardComponent } from './clans-inactive-card.component';
import { ClanMemberCardComponent } from '../components/clan-member-card/clan-member-card.component';
import { PipesModule } from '@destiny-clan-dashboard/components/pipes';

@NgModule({
  declarations: [ClansInactiveCardComponent],
  exports: [ClansInactiveCardComponent],
  imports: [CommonModule, ClanMemberCardComponent, PipesModule]
})
export class ClansInactiveCardModule {}
