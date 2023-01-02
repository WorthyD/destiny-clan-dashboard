import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../data-access/activities.service';

@Component({
  selector: 'app-activities-dashboard',
  templateUrl: './activities-dashboard.component.html',
  styleUrls: ['./activities-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesDashboardComponent {
  constructor(private activitiesService: ActivitiesService, private router: Router, private route: ActivatedRoute) {}
  curatedActivityGroups = this.activitiesService.getCuratedActivities();

  viewActivity(hash: number) {
    this.router.navigate([hash], { relativeTo: this.route });
  }
}
