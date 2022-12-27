import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTableComponent } from './activity-table.component';
import { TableViewComponent } from '@destiny/components/shared/table-view';
@NgModule({
  declarations: [ActivityTableComponent],
  exports: [ActivityTableComponent],
  imports: [CommonModule, TableViewComponent]
})
export class ActivityTableModule {}
