import { createFeatureSelector } from '@ngrx/store';

import { ClansWithMembersState, ClanWithMembersConfigAdapter } from './clans-with-members.state';

export const selectClansWithMembersState = createFeatureSelector<ClansWithMembersState>('clansWithMembers');

export const { selectEntities: selectAllClansWithMembersEntities, selectAll: selectAllClansWithMembers } =
  ClanWithMembersConfigAdapter.getSelectors(selectClansWithMembersState);

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
