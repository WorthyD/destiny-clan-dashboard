import { Component } from '@angular/core';
import { ClansDetailsActivitiesService } from '../data-access/clans-details-activities.service';

@Component({
  selector: 'app-clans-activity-card',
  templateUrl: './clans-activity-card.component.html',
  styleUrls: ['./clans-activity-card.component.scss']
})
export class ClansActivityCardComponent {
  constructor(private clansDetailsActivitiesService: ClansDetailsActivitiesService) {}
  events$ = this.clansDetailsActivitiesService.events$;
  loading$ = this.clansDetailsActivitiesService.playerActivitiesLoading$;
}
