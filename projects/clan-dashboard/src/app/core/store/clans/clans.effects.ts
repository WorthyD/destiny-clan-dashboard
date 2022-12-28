import { Injectable } from '@angular/core';
import { AppState } from '@core/core.state';
import { LocalStorageService } from '@core/services/local-storage.service';
import { ManifestService } from '@core/services/manifest.service';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of, combineLatest, merge } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as clanActions from './clans.actions';
import { selectClansState } from './clans.selectors';
import { tap, withLatestFrom, distinctUntilChanged, filter } from 'rxjs/operators';

const CLANS_KEY = 'clans';
@Injectable()
export class ClansEffects {
  constructor(private actions$: Actions, private store: Store, private localStorageService: LocalStorageService) {}

  persistSettings$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          clanActions.addClan,
          clanActions.removeClan,
          clanActions.setClans,
          clanActions.updateClan,
          clanActions.resetClan
        ),
        concatLatestFrom(() => this.store.select(selectClansState)),
        tap(([action, clans]) => this.localStorageService.setItem(CLANS_KEY, clans))
      );
    },
    { dispatch: false }
  );

  updateLastProfileSync$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clanActions.updateClanProfileSync),
      concatLatestFrom(() => this.store.select(selectClansState)),
      map(([action, clans]) => {
        const clanToUpdate = clans.entities[action.clanId];
        return clanActions.updateClan({ clan: { ...clanToUpdate, profileUpdate: new Date().toString() } });
      })
    );
  });

  updateLastMemberActivitySync$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clanActions.updateClanMemberActivitySync),
      concatLatestFrom(() => this.store.select(selectClansState)),
      map(([action, clans]) => {
        const clanToUpdate = clans.entities[action.clanId];
        return clanActions.updateClan({ clan: { ...clanToUpdate, memberRecentActivityUpdate: new Date().toString() } });
      })
    );
  });
}
