import { ActionReducerMap } from '@ngrx/store';
import { ManifestReducer, ManifestState, ManifestEffects } from './store/manifest';
import { ClansEffects, ClansState, ClansReducer } from './store/clans';

export const coreEffects = [ManifestEffects];
export const coreReducers: ActionReducerMap<AppState> = {
  manifest: ManifestReducer,
  clans: ClansReducer
};

export interface AppState {
  manifest: ManifestState;
  clans: ClansState;
}
