import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [BarChartComponent],
  imports: [ NgApexchartsModule],
  exports: [BarChartComponent]
})
export class BarChartModule {}
