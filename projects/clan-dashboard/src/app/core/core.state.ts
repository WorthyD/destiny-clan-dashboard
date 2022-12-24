import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ManifestReducer, ManifestState, ManifestEffects } from './store/manifest';
import { ClansEffects, ClansState, ClansReducer } from './store/clans';
import { initStateFromLocalStorage } from './store/meta-reducers/init-state-from-local-storage.reducer';
import { NotificationState, NotificationReducer } from './store/notifications';
import { ClansMembersProfilesState } from './store/clans-members-profiles/clan-members-profiles.state';
import { ClansMembersProfilesReducer } from './store/clans-members-profiles/clan-members-profiles.reducers';
import { ClansMembersProfilesEffects } from './store/clans-members-profiles/clan-members-profiles.effects';

export const coreEffects = [ManifestEffects, ClansEffects, ClansMembersProfilesEffects];

export const coreReducers: ActionReducerMap<AppState> = {
  manifest: ManifestReducer,
  clans: ClansReducer,
  notifications: NotificationReducer,
  clansMembersProfiles: ClansMembersProfilesReducer
};

export const metaReducers: MetaReducer<AppState>[] = [initStateFromLocalStorage];

export interface AppState {
  manifest: ManifestState;
  clans: ClansState;
  notifications: NotificationState;
  clansMembersProfiles: ClansMembersProfilesState;
}
