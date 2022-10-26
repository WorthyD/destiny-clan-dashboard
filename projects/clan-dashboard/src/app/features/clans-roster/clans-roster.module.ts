import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansRosterComponent } from './clans-roster.component';
import { ClansRosterService } from './clans-roster.service';

@NgModule({
  declarations: [ClansRosterComponent],
  providers: [ClansRosterService],
  exports: [ClansRosterComponent],
  imports: [CommonModule]
})
export class ClansRosterModule {}
