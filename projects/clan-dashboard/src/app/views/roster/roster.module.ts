import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster.component';
import { RosterRoutingModule } from './roster-routing.module';

@NgModule({
  declarations: [RosterComponent],
  imports: [CommonModule, RosterRoutingModule]
})
export class RosterModule {}
