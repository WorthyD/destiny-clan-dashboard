import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDetailComponent } from './player-detail.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  TriumphReportPipe,
  D2ChecklistUrlPipe,
  DestinyTrackerUrlPipe,
  BungieProfileUrlPipe,
  DungeonReportProfileUrlPipe,
  RaidReportProfileUrlPipe
} from '@dcd/shared/utils/pipes';

@NgModule({
  declarations: [PlayerDetailComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    BungieProfileUrlPipe,
    RaidReportProfileUrlPipe,
    DungeonReportProfileUrlPipe,
    DestinyTrackerUrlPipe,
    D2ChecklistUrlPipe,
    TriumphReportPipe,
    MatButtonModule
  ]
})
export class PlayerDetailModule {}
