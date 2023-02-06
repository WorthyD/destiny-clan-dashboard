import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTableComponent } from './activity-table.component';
import { TableViewComponent } from '@destiny/components/shared/table-view';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [ActivityTableComponent],
  exports: [ActivityTableComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, TableViewComponent, RouterModule ]
})
export class ActivityTableModule {}
