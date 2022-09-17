import { ActionReducerMap } from '@ngrx/store';
import { ManifestReducer, ManifestState, ManifestEffects } from './store/manifest';

export const coreEffects = [ManifestEffects];
export const coreReducers: ActionReducerMap<AppState> = {
  manifest: ManifestReducer
};

export interface AppState {
  manifest: ManifestState;
}
