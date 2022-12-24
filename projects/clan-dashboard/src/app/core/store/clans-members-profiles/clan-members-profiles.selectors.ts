import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ClansMembersProfilesState, ClansMembersProfilesAdapter } from './clan-members-profiles.state';

export const selectClanMemberProfileState = createFeatureSelector<ClansMembersProfilesState>('clansMembersProfiles');

export const {
  //selectIds,
  //selectEntities,
  selectAll: selectAllClansMembersProfiles
  //selectTotal
} = ClansMembersProfilesAdapter.getSelectors(selectClanMemberProfileState);

export const selectClanMemberProfileStateLoading = createSelector(
  selectClanMemberProfileState,
  (state) => state.isLoading
);
