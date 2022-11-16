import { Injectable } from '@angular/core';
import { AppState } from '@core/core.state';
import { ManifestService } from '@core/services/manifest.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadManifest, loadManifestComplete, loadManifestFailure } from './manifest.actions';

@Injectable()
export class ManifestEffects {
  constructor(private actions$: Actions, private manifestService: ManifestService, private store: Store) {}

  loadManifest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadManifest),
      switchMap(() => {
        return this.manifestService.loadManifest().pipe(
          map(() => {
            return loadManifestComplete();
          }),
          catchError(async (error) => loadManifestFailure(error))
        );
      })
    );
  });
}
