import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from '../data-access/activities.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityDetailComponent {
  constructor(private activitiesService: ActivitiesService, private route: ActivatedRoute) {}
  curatedActivities = this.activitiesService.getCuratedActivities();

  activityHash$ = this.route.paramMap.pipe(map((params) => +params.get('activityHash')));

  vm$ = this.activityHash$.pipe(
    map((hash) => {
      return {
        activity: this.activitiesService.getActivityById(hash),
        metrics: this.activitiesService.getCuratedMetrics(hash)
      };
    })
  );
}
