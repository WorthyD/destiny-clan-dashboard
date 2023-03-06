import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartModule } from '@destiny/components/shared/bar-chart';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-clan-activity-bar-chart',
  standalone: true,
  imports: [CommonModule, BarChartModule, MatCardModule],
  templateUrl: './clan-activity-bar-chart.component.html',
  styleUrls: ['./clan-activity-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClanActivityBarChartComponent {
  @Input()
  events;

  @Input()
  loading: boolean;

  @Input()
  updating: boolean;
}
