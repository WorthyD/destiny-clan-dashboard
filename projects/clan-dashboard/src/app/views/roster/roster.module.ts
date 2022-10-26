import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster.component';
import { RosterRoutingModule } from './roster-routing.module';
import { ClansRosterModule } from '@features/clans-roster';

@NgModule({
  declarations: [RosterComponent],
  imports: [CommonModule, RosterRoutingModule, ClansRosterModule]
})
export class RosterModule {}
