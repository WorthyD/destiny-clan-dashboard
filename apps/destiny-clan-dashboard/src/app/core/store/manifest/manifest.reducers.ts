import { createReducer, on } from '@ngrx/store';
import { initialManifestState, ManifestState } from './manifest.state';
import { loadManifest, loadManifestComplete, loadManifestFailure } from './manifest.actions';

export const ManifestReducer = createReducer(
  initialManifestState,
  on(
    loadManifest,
    (state): ManifestState => ({
      ...state,
      loaded: false,
      loading: true
    })
  ),
  on(
    loadManifestComplete,
    (state): ManifestState => ({
      ...state,
      loaded: true,
      loading: false
    })
  ),
  on(
    loadManifestFailure,
    (state, { error }): ManifestState => ({
      ...state,
      loaded: false,
      loading: false,
      error
    })
  )
);
