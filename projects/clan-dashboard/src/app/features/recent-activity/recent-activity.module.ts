import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentActivityComponent } from './recent-activity.component';
import { RecentActivityService } from './data-access/recent-activity.service';

@NgModule({
  declarations: [RecentActivityComponent],
  providers: [RecentActivityService],
  exports: [RecentActivityComponent],
  imports: [CommonModule]
})
export class RecentActivityModule {}
