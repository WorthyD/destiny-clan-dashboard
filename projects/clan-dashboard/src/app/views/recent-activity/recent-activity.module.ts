import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentActivityComponent } from './recent-activity.component';
import { RecentActivityRoutingModule } from './recent-activity-routing.module';
import {RecentActivityModule as RecentActivityFeatureModule} from '@features/recent-activity/recent-activity.module';

@NgModule({
  declarations: [RecentActivityComponent],
  imports: [CommonModule, RecentActivityRoutingModule, RecentActivityFeatureModule]
})
export class RecentActivityModule {}
