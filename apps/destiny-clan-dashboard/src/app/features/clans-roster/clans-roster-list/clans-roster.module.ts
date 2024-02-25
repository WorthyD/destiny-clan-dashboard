import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansRosterComponent } from './clans-roster.component';
import { ClansRosterService } from '../data-access/clans-roster.service';
import { TableViewComponent } from '@destiny-clan-dashboard/components/shared/table-view';
import { PipesModule } from '@destiny-clan-dashboard/components/pipes';

import { ClassCellComponent, ClassIconPipe } from '../components/class-cell/class-cell.component';
import { ClansRosterRoutingModule } from './clan-roster-routing.module.ts';
import { BungieDatePipe, BungieDateTimePipe } from '@destiny-clan-dashboard/shared/pipes/bungie-date-pipe';

@NgModule({
  declarations: [ClansRosterComponent, ClassCellComponent, ClassIconPipe],
  providers: [ClansRosterService, BungieDatePipe, BungieDateTimePipe],
  exports: [ClansRosterComponent],
  imports: [CommonModule, TableViewComponent, PipesModule, ClansRosterRoutingModule]
})
export class ClansRosterModule {}
