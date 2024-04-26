import { ChangeDetectionStrategy, Component } from '@angular/core';
//import { ClansDetailsService } from '../data-access/clans-details.service';
import { ClansDetailsService } from '@dcd/dashboard/data-access';

@Component({
  selector: 'app-clans-details-dashboard',
  templateUrl: './clans-details-dashboard.component.html',
  styleUrls: ['./clans-details-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClansDetailsDashboardComponent {
  constructor(private clansDetailsService: ClansDetailsService) {}
  clans$ = this.clansDetailsService.activeClans$;
}
