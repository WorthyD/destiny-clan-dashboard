import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansActivityCardComponent } from './clans-activity-card.component';
//import { ClanActivityBarChartComponent } from '../../../../ui/src/lib/clan-activity-bar-chart/clan-activity-bar-chart.component';
import { ClanActivityBarChartComponent } from '@dcd/dashboard/ui';

@NgModule({
  declarations: [ClansActivityCardComponent],
  exports: [ClansActivityCardComponent],
  imports: [CommonModule, ClanActivityBarChartComponent]
})
export class ClansActivityCardModule {}
