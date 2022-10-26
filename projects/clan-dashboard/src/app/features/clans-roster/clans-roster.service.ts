import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClanIds, selectEnabledClans, selectLastProfileUpdate } from '@core/store/clans';
import { forkJoin, forkJoin, from, map, mergeMap, switchMap, tap, toArray } from 'rxjs';
@Injectable()
export class ClansRosterService {
  activeClansId$ = this.store.select(selectEnabledClanIds);
  activeClanUpdateDates$ = this.activeClansId$.pipe(
    map((clanIds) => {
      console.log('clanids', clanIds);
      return from(clanIds).pipe(
        forkJoin((clanId) => {
          console.log();
          return this.store.select(selectLastProfileUpdate(clanId));
        }),
        tap((x) => {
          console.log('tapping1', x);
        })
      );
    }),
    tap((x) => {
      console.log('tapping', x);
    })
  );

  constructor(private store: Store) {}
}
