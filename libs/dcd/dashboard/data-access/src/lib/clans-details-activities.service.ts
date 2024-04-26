import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, Observable, of, switchMap, take, tap } from 'rxjs';
//import { ProfileRecentActivityWorkerService } from '../../../workers/profile-recent-activity/profile-recent-activity.service';
//import { ClansDetailsModule } from '../clans-details/clans-details.module';
//import { ClansDetailsService } from './clans-details.service';
//import { DailyClanAggregateTimeService } from 'libs/data/src/lib/stat-aggregators/clan-aggregate-time/daily-clan-aggregate-time.service';
import { Store } from '@ngrx/store';
import { selectAllClansWithMembersProfiles, selectAllRecentActivityUpdates } from '@dcd/shared/data-access/store';
import { ProfileRecentActivityWorkerService } from './profile-recent-activity.fake.service';
//import { selectAllRecentActivityUpdates } from '@core/store/clans';

@Injectable()
export class ClansDetailsActivitiesService {
  constructor(
    private store: Store,
//    private clansDetailsService: ClansMembersService,
    private profileRecentActivityWorkerService: ProfileRecentActivityWorkerService
  ) {}

  clanMembersProfiles$ = this.store.select(selectAllClansWithMembersProfiles);
  activityUpdates$ = this.store.select(selectAllRecentActivityUpdates);
  areActivitiesUpdating$ = false;
  playerActivitiesLoadingSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  playerActivitiesLoading$: Observable<boolean> = this.playerActivitiesLoadingSource.asObservable();

  events$ = this.activityUpdates$.pipe(
    //distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    tap(() => this.playerActivitiesLoadingSource.next(true)),
    switchMap((y) => {
      // console.log('-----------------');
      return this.clanMembersProfiles$.pipe(
        //take(1),
        filter((x: any[]) => x.length > 0),
        switchMap((x) => {
          //console.log('------wark-----------', x);
          return this.profileRecentActivityWorkerService.getAllActivities(x, 'daily', 0, 0);
        })
      );
    }),
    tap(() => this.playerActivitiesLoadingSource.next(false))
  );
}
