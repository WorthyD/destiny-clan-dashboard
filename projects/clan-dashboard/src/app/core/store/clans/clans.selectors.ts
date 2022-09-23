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
