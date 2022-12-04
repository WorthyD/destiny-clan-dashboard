import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentActivityComponent } from './recent-activity.component';
import { PipesModule } from '@destiny/components/pipes';
import { TableViewComponent } from '@destiny/components/shared/table-view';
import { RecentActivityRoutingModule } from './clan-roster-routing.module.ts';

@NgModule({
  declarations: [RecentActivityComponent],
  exports: [RecentActivityComponent],
  imports: [CommonModule, TableViewComponent, PipesModule, RecentActivityRoutingModule]
})
export class RecentActivityModule {}
