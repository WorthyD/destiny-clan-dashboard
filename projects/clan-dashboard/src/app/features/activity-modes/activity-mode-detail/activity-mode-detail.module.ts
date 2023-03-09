import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityModeDetailComponent } from './activity-mode-detail.component';
import { ActivityModeDetailRoutingModule } from './activity-mode-detail-routes.module';
import { ActivityModeTableModule } from '../activity-mode-table/activity-mode-table.module';

@NgModule({
  declarations: [ActivityModeDetailComponent],
  imports: [CommonModule, ActivityModeDetailRoutingModule, ActivityModeTableModule]
})
export class ActivityModeDetailModule {}
