import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ClansState, ClanConfigAdapter } from './clans.state';

export const selectClansState = createFeatureSelector<ClansState>('clans');

export const {
  selectIds: selectClanIds,
  selectEntities: selectAllClanEntities,
  selectAll: selectAllClans,
  selectTotal: selectTotalClans
} = ClanConfigAdapter.getSelectors(selectClansState);

export const selectEnabledClans = createSelector(selectAllClans, (state) => state.filter((c) => c.enabled === true));
export const selectEnabledClanIds = createSelector(selectAllClans, (state) =>
  state.filter((c) => c.enabled === true).map((x) => x.clanId)
);

export const selectLastProfileUpdate = (clanId: string) =>
  createSelector(selectAllClanEntities, (state) => {
    return (clanId && state[clanId]?.profileUpdate) || '';
  });

export const selectLastRecentActivityUpdate = (clanId: string) =>
  createSelector(selectAllClanEntities, (state) => {
    return (clanId && state[clanId]?.memberRecentActivityUpdate) || '';
  });
