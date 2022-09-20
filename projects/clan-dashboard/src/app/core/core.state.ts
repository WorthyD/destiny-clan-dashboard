import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ManifestReducer, ManifestState, ManifestEffects } from './store/manifest';
import { ClansEffects, ClansState, ClansReducer } from './store/clans';
import { initStateFromLocalStorage } from './store/meta-reducers/init-state-from-local-storage.reducer';

export const coreEffects = [ManifestEffects, ClansEffects];

export const coreReducers: ActionReducerMap<AppState> = {
  manifest: ManifestReducer,
  clans: ClansReducer
};

export const metaReducers: MetaReducer<AppState>[] = [initStateFromLocalStorage];

export interface AppState {
  manifest: ManifestState;
  clans: ClansState;
}
