import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ManifestEffects, ManifestReducer, ManifestState } from './manifest';
import { ClansEffects, ClansReducer, ClansState } from './clans';
import { ClansWithMembersEffects, ClansWithMembersReducer, ClansWithMembersState } from './clans-with-members';
import {
  ClansWithMembersAndProfilesState,
  ClansWithMembersProfilesEffects,
  ClansWithMembersProfilesReducer
} from './clans-with-members-profiles';
import { NotificationReducer, NotificationState } from './notifications';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
//import { ManifestReducer, ManifestState, ManifestEffects } from '../../../../../libs/dcd/shared/data-access/store/src/lib/manifest';
//import { ClansEffects, ClansState, ClansReducer } from '../../../../../libs/dcd/shared/data-access/store/src/lib/clans';
//import { initStateFromLocalStorage } from './store/meta-reducers/init-state-from-local-storage.reducer';
//import { NotificationState, NotificationReducer } from './store/notifications';
// import { ClansMembersProfilesState } from './store/clans-members-profiles/clan-members-profiles.state';
// import { ClansMembersProfilesReducer } from './store/clans-members-profiles/clan-members-profiles.reducers';
// import { ClansMembersProfilesEffects } from './store/clans-members-profiles/clan-members-profiles.effects';
//import { ClansWithMembersReducer, ClansWithMembersState, ClansWithMembersEffects } from './store/clans-with-members';
// import {
//   ClansWithMembersProfilesReducer,
//   ClansWithMembersAndProfilesState,
//   ClansWithMembersProfilesEffects
// } from './store/clans-with-members-profiles';

export const coreEffects = [ManifestEffects, ClansEffects, ClansWithMembersEffects, ClansWithMembersProfilesEffects];

export const coreReducers: ActionReducerMap<AppState> = {
  manifest: ManifestReducer,
  clans: ClansReducer,
  notifications: NotificationReducer,
  //  clansMembersProfiles: ClansMembersProfilesReducer,
  clansWithMembers: ClansWithMembersReducer,
  clansWithMembersProfiles: ClansWithMembersProfilesReducer
};

export const metaReducers: MetaReducer<AppState>[] = [initStateFromLocalStorage];

export interface AppState {
  manifest: ManifestState;
  clans: ClansState;
  notifications: NotificationState;
  // clansMembersProfiles: ClansMembersProfilesState;
  clansWithMembers: ClansWithMembersState;
  clansWithMembersProfiles: ClansWithMembersAndProfilesState;
}
