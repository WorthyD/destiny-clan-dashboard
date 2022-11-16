import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansRosterComponent } from './clans-roster.component';
import { ClansRosterService } from './clans-roster.service';
// import {} from '@destiny/data
import { TableViewComponent } from '@destiny/components/shared/table-view';
import { PipesModule } from '@destiny/components/pipes';
import { ClassCellComponent, ClassIconPipe } from './class-cell/class-cell.component';

@NgModule({
  declarations: [ClansRosterComponent, ClassCellComponent, ClassIconPipe],
  providers: [ClansRosterService],
  exports: [ClansRosterComponent],
  imports: [CommonModule, TableViewComponent, PipesModule]
})
export class ClansRosterModule {}
