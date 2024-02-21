import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartModule } from '@destiny-clan-dashboard/components/shared/bar-chart';
import { MatCardModule } from '@angular/material/card';
import { SkeletonChartLoaderComponent } from '@destiny-clan-dashboard/components/shared/skeleton-chart-loader';

@Component({
  selector: 'app-activity-timeline',
  standalone: true,
  imports: [CommonModule, BarChartModule, MatCardModule, SkeletonChartLoaderComponent],
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityTimelineComponent {
  @Input()
  events;

  @Input()
  loading: boolean;
}
