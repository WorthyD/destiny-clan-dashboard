import { Injectable } from '@angular/core';
import { AppState } from '@core/core.state';
import { LocalStorageService } from '@core/services/local-storage.service';
import { ManifestService } from '@core/services/manifest.service';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of, combineLatest, merge } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
// import { loadManifest, loadManifestComplete, loadManifestFailure } from './manifest.actions';
import { addClan, removeClan, setClans } from './clans.actions';
import { selectClansState } from './clans.selectors';
import { tap, withLatestFrom, distinctUntilChanged, filter } from 'rxjs/operators';

const CLANS_KEY = 'clans';
@Injectable()
export class ClansEffects {
  constructor(private actions$: Actions, private store: Store, private localStorageService: LocalStorageService) {}
  persistSettings$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addClan, removeClan, setClans),
        concatLatestFrom(() => this.store.select(selectClansState)),
        tap(([action, clans]) => this.localStorageService.setItem(CLANS_KEY, clans))
      );
    },
    { dispatch: false }
  );
  // loadManifest$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadManifest),
  //     switchMap(() => {
  //       return this.manifestService.loadManifest().pipe(
  //         map(() => {
  //           return loadManifestComplete();
  //         }),
  //         catchError(async (error) => loadManifestFailure(error))
  //       );
  //     })
  //   );
  // });
}
