import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityBreakdownListComponent } from './activity-breakdown-list.component';
import { ActivityBreakdownItemComponent } from '../components/activity-breakdown-item/activity-breakdown-item.component';

@NgModule({
  declarations: [ActivityBreakdownListComponent],
  exports: [ActivityBreakdownListComponent],
  imports: [CommonModule, ActivityBreakdownItemComponent]
})
export class ActivityBreakdownListModule {}
