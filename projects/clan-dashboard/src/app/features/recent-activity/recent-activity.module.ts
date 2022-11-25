import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentActivityComponent } from './recent-activity.component';
import { RecentActivityService } from './data-access/recent-activity.service';
import { PipesModule } from '@destiny/components/pipes';
import { TableViewComponent } from '@destiny/components/shared/table-view';

@NgModule({
  declarations: [RecentActivityComponent],
  providers: [RecentActivityService],
  exports: [RecentActivityComponent],
  imports: [CommonModule, TableViewComponent, PipesModule]
})
export class RecentActivityModule {}
