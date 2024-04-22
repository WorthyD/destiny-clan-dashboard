import { Injectable } from '@angular/core';
import { ManifestService } from '@dcd/shared/data-access/manifest';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadManifest, loadManifestComplete, loadManifestFailure } from './manifest.actions';

@Injectable()
export class ManifestEffects {
  constructor(private actions$: Actions, private manifestService: ManifestService) {}

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
