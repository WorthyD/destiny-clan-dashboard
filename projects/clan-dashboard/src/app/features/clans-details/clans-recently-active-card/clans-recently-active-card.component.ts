import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';
import { ClansDetailsService } from '../data-access/clans-details.service';

@Component({
  selector: 'app-clans-recently-active-card',
  templateUrl: './clans-recently-active-card.component.html',
  styleUrls: ['./clans-recently-active-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClansRecentlyActiveCardComponent {
  constructor(private clansDetailsService: ClansDetailsService) {}

  lastLoginMembers$ = this.clansDetailsService.lastLoginMembers$.pipe(startWith([]));
  isLoading$ = this.clansDetailsService.clanProfilesLoading$;
  vm$ = combineLatest([this.lastLoginMembers$, this.isLoading$]).pipe(
    map(([lastLoginMembers, isLoading]) => ({
      lastLoginMembers,
      isLoading
    }))
  );
}
