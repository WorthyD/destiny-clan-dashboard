import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ManifestState } from './manifest.state';

export const selectManifestState = createFeatureSelector<ManifestState>('manifest');
export const selectManifest = createSelector(selectManifestState, (state: ManifestState) => state);
export const selectManifestLoading = createSelector(selectManifest, (state: ManifestState) => state.loading);
export const selectManifestLoaded = createSelector(selectManifest, (state: ManifestState) => state.loaded);
export const selectManifestError = createSelector(selectManifest, (state: ManifestState) => state.error);
