import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ClansState, ClanConfigAdapter } from './clans.state';

export const selectClansState = createFeatureSelector<ClansState>('clans');

// export const selectClansStateClans = createSelector(selectClansState, (state) => state.clans);


export const {
  selectIds: getClanIds,
  selectEntities: getAllClanEntities,
  selectAll: getAllClans,
  selectTotal: getTotalClans
} = ClanConfigAdapter.getSelectors(selectClansState);

// export const getEnabledClans
