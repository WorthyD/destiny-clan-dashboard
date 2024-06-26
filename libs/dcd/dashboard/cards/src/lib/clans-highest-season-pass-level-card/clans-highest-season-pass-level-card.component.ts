import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClansDetailsService } from '@dcd/dashboard/data-access';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-clans-highest-season-pass-level-card',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <dcd-clan-member-card
        [cardTitle]="'Highest Season Pass'"
        [itemTemplate]="itemTemplate"
        [isLoading]="vm.isLoading"
        [members]="vm.highestPowerMembers"
      >
        <ng-template let-member #itemTemplate>
          <div>
            {{ member.seasonPass }}
          </div>
        </ng-template>
      </dcd-clan-member-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./clans-highest-season-pass-level-card.component.scss']
})
export class ClansHighestSeasonPassLevelCardComponent {
  constructor(private clansDetailsService: ClansDetailsService) {}

  highestPowerMembers$ = this.clansDetailsService.highestSeasonPassMembers$.pipe(startWith([]));
  isLoading$ = this.clansDetailsService.clanProfilesLoading$;
  vm$ = combineLatest([this.highestPowerMembers$, this.isLoading$]).pipe(
    map(([highestPowerMembers, isLoading]) => ({
      highestPowerMembers,
      isLoading
    }))
  );
}
