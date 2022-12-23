import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { combineLatest, map, startWith, tap } from 'rxjs';
import { ClansDetailsService } from '../data-access/clans-details.service';

@Component({
  selector: 'app-clans-highest-light-level-card',
  templateUrl: './clans-highest-light-level-card.component.html',
  styleUrls: ['./clans-highest-light-level-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClansHighestLightLevelCardComponent {
  constructor(private clansDetailsService: ClansDetailsService) {}

  highestPowerMembers$ = this.clansDetailsService.highestPowerBonusMembers$.pipe(startWith([]));
  isLoading$ = this.clansDetailsService.clanProfilesLoading$;
  vm$ = combineLatest([this.highestPowerMembers$, this.isLoading$]).pipe(
    map(([highestPowerMembers, isLoading]) => ({
      highestPowerMembers,
      isLoading
    }))
  );
}
