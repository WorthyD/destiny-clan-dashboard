import { Component } from '@angular/core';
import { SealsService } from '../data-access/seals.service';

@Component({
  selector: 'app-seals-dashboard',
  templateUrl: './seals-dashboard.component.html',
  styleUrls: ['./seals-dashboard.component.scss']
})
export class SealsDashboardComponent {
  constructor(private sealsService: SealsService) {}
  seals$ = this.sealsService.milestonesWithProfiles$;
}
