import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDetailComponent } from './player-detail.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BungieProfileUrlPipe } from '@destiny/components/pipes/bungie-profile-url';
import { RaidReportProfileUrlPipe } from '@destiny/components/pipes/raid-report-url';
import { DungeonReportProfileUrlPipe } from '@destiny/components/pipes/dungeon-report-url';
import { DestinyTrackerUrlPipe } from '@destiny/components/pipes/destiny-tracker-url';
import { D2ChecklistUrlPipe } from '@destiny/components/pipes/d2-checklist-url';
import { TriumphReportPipe } from '@destiny/components/pipes/triumph-report';

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
