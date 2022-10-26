import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClanIds, selectEnabledClans, selectLastProfileUpdate } from '@core/store/clans';
import { from, map, mergeMap, switchMap, toArray } from 'rxjs';
@Injectable()
export class ClansRosterService {
  activeClansId$ = this.store.select(selectEnabledClanIds);
  activeClanUpdateDates$ = this.activeClansId$.pipe(
    switchMap((clanIds) => {
      console.log('clanids', clanIds);
      return from(clanIds).pipe(
        mergeMap((clanId) => {
          return this.store.select(selectLastProfileUpdate(clanId));
        }),
        toArray()
      );
    })
  );

  constructor(private store: Store) {}
}
