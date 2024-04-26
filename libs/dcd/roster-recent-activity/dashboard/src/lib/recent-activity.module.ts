import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentActivityComponent } from './recent-activity.component';
import { TableViewComponent } from '@destiny-clan-dashboard/components/shared/table-view';
import { RecentActivityRoutingModule } from './clan-roster-routing.module.ts';
import { BungieDateTimePipe, PlaytimePipe } from '@dcd/shared/utils/pipes';
@NgModule({
  declarations: [RecentActivityComponent],
  exports: [RecentActivityComponent],
  imports: [CommonModule, TableViewComponent, BungieDateTimePipe,PlaytimePipe, RecentActivityRoutingModule]
})
export class RecentActivityModule {}
