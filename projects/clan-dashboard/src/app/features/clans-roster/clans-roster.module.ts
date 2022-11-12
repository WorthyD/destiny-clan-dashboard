import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansRosterComponent } from './clans-roster.component';
import { ClansRosterService } from './clans-roster.service';
// import {} from '@destiny/data
import { TableViewComponent } from '@destiny/components/shared/table-view';

@NgModule({
  declarations: [ClansRosterComponent],
  providers: [ClansRosterService],
  exports: [ClansRosterComponent],
  imports: [CommonModule, TableViewComponent]
})
export class ClansRosterModule {}
