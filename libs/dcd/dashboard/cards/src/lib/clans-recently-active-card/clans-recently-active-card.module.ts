import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansRecentlyActiveCardComponent } from './clans-recently-active-card.component';
import { ClanMemberCardComponent } from '@dcd/dashboard/ui';
import { BungieDateTimePipe } from '@dcd/shared/utils/pipes';

@NgModule({
  declarations: [ClansRecentlyActiveCardComponent],
  exports: [ClansRecentlyActiveCardComponent],
  imports: [CommonModule, ClanMemberCardComponent, BungieDateTimePipe]
})
export class ClansRecentlyActiveCardModule {}
