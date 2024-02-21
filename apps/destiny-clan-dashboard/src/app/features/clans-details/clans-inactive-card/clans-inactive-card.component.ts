import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';
import { ClansDetailsService } from '../data-access/clans-details.service';

@Component({
  selector: 'app-clans-inactive-card',
  templateUrl: './clans-inactive-card.component.html',
  styleUrls: ['./clans-inactive-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClansInactiveCardComponent {
  constructor(private clansDetailsService: ClansDetailsService) {}

  inactiveMemberList$ = this.clansDetailsService.inactiveMemberList$.pipe(startWith([]));
  isLoading$ = this.clansDetailsService.clanProfilesLoading$;
  vm$ = combineLatest([this.inactiveMemberList$, this.isLoading$]).pipe(
    map(([inactiveMemberList, isLoading]) => ({
      inactiveMemberList,
      isLoading
    }))
  );
}
