import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansInactiveCardComponent } from './clans-inactive-card.component';
import { ClanMemberCardComponent } from '@dcd/dashboard/ui';
import { BungieDatePipe } from '@dcd/shared/utils/pipes';

@NgModule({
  declarations: [ClansInactiveCardComponent],
  exports: [ClansInactiveCardComponent],
  imports: [CommonModule, ClanMemberCardComponent, BungieDatePipe]
})
export class ClansInactiveCardModule {}
