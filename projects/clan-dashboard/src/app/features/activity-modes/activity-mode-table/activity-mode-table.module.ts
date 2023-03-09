import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityModeTableComponent } from './activity-mode-table.component';
import { ActivityModeTableRoutingModule } from './activity-mode-table-routes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableViewComponent } from '@destiny/components/shared/table-view';
import { PipesModule } from '@destiny/components/pipes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ActivityModeTableComponent],
  exports: [ActivityModeTableComponent],
  imports: [CommonModule, MatButtonModule, PipesModule, MatIconModule, TableViewComponent, RouterModule]
})
export class ActivityModeTableModule {}
