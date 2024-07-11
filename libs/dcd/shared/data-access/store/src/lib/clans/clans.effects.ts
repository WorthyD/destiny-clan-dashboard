import { Injectable } from '@angular/core';
import { LocalStorageService } from '@dcd/shared/utils/local-storage';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as clanActions from './clans.actions';
import { selectClansState } from './clans.selectors';
import { tap } from 'rxjs/operators';

const CLANS_KEY = 'clans';
@Injectable()
export class ClansEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private localStorageService: LocalStorageService
  ) {}

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
        // @ts-ignore
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

        // @ts-ignore
        return clanActions.updateClan({ clan: { ...clanToUpdate, memberRecentActivityUpdate: new Date().toString() } });
      })
    );
  });
  updateBungieInfoSync$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clanActions.updateBungieInfoSync),
      concatLatestFrom(() => this.store.select(selectClansState)),
      map(([action, clans]) => {
        const clanToUpdate = clans.entities[action.clanId];

        // @ts-ignore
        return clanActions.updateClan({ clan: { ...clanToUpdate, bungieInfoUpdate: new Date().toString() } });
      })
    );
  });
}
