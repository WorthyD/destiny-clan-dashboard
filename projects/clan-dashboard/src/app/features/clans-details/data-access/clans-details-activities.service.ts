import { Injectable } from '@angular/core';
import { ClansMembersService } from '@core/services/clans-members.service';
import { BehaviorSubject, distinctUntilChanged, Observable, of, switchMap, take, tap } from 'rxjs';
import { ProfileRecentActivityWorkerService } from '../../../workers/profile-recent-activity/profile-recent-activity.service';
import { ClansDetailsModule } from '../clans-details/clans-details.module';
import { ClansDetailsService } from './clans-details.service';
import { DailyClanAggregateTimeService } from 'projects/data/src/lib/stat-aggregators/clan-aggregate-time/daily-clan-aggregate-time.service';
import { Store } from '@ngrx/store';
import { selectAllRecentActivityUpdates } from '@core/store/clans';

@Injectable({
  providedIn: ClansDetailsModule
})
export class ClansDetailsActivitiesService {
  constructor(
    private store: Store,
    private clansDetailsService: ClansMembersService,
    private profileRecentActivityWorkerService: ProfileRecentActivityWorkerService
  ) {}
  activityUpdates$ = this.store.select(selectAllRecentActivityUpdates);
  areActivitiesUpdating$ = false;
  playerActivitiesLoadingSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  playerActivitiesLoading$: Observable<boolean> = this.playerActivitiesLoadingSource.asObservable();

  events$ = this.activityUpdates$.pipe(
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    tap(() => this.playerActivitiesLoadingSource.next(true)),
    switchMap((y) => {
      return this.clansDetailsService.clanMembersProfiles$.pipe(
        take(1),
        switchMap((x) => {
          return this.profileRecentActivityWorkerService.getAllActivities(x, 'daily');
        })
      );
    }),
    tap(() => this.playerActivitiesLoadingSource.next(false))
  );
}
