import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivitiesService } from '../data-access/activities.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-activity-dashboard',
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.scss']
})
export class ActivityDashboardComponent {
  activitiesService = inject(ActivitiesService);
  route = inject(ActivatedRoute);

  curatedActivities = this.activitiesService.getCuratedActivities();

  activityHash$ = this.route.paramMap.pipe(map((params) => +params.get('activityHash')));

  vm$ = this.activityHash$.pipe(
    map((hash) => {
      return {
        activity: this.activitiesService.getActivityById(hash),
        metrics: this.activitiesService.getCuratedMetrics(hash),
        collections: this.activitiesService.getCuratedCollections(hash),
        records: this.activitiesService.getCuratedRecords(hash)
      };
    })
  );

}
