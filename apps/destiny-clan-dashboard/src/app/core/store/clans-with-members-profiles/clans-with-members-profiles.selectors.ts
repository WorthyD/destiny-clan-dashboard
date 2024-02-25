import { createSelector, createFeatureSelector } from '@ngrx/store';

import {
  ClansWithMembersAndProfilesState,
  ClanWithMembersProfilesConfigAdapter
} from './clans-with-members-profiles.state';

export const selectClansWithMembersProfilesState =
  createFeatureSelector<ClansWithMembersAndProfilesState>('clansWithMembersProfiles');

export const {
  selectEntities: selectAllClansWithMembersProfilesEntities,
  selectAll: selectAllClansWithMembersProfiles
} = ClanWithMembersProfilesConfigAdapter.getSelectors(selectClansWithMembersProfilesState);

// export const selectEnabledClans = createSelector(selectAllClans, (state) => state.filter((c) => c.enabled === true));
// export const selectEnabledClanIds = createSelector(selectAllClans, (state) =>
//   state.filter((c) => c.enabled === true).map((x) => x.clanId)
// );

// export const selectLastProfileUpdate = (clanId: string) =>
//   createSelector(selectAllClanEntities, (state) => {
//     return (clanId && state[clanId]?.profileUpdate) || '';
//   });

// export const selectLastRecentActivityUpdate = (clanId: string) =>
//   createSelector(selectAllClanEntities, (state) => {
//     return (clanId && state[clanId]?.memberRecentActivityUpdate) || '';
//   });

// export const selectAllRecentActivityUpdates = createSelector(selectAllClans, (state) => {

//   return state.map((x) => x.memberRecentActivityUpdate);
// });
