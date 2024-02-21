import { createReducer, on } from '@ngrx/store';
import {
  initialClanWithMembersAndProfileState,
  ClansWithMembersAndProfilesState,
  ClanWithMembersProfilesConfigAdapter
} from './clans-with-members-profiles.state';
import { setClansWMembersProfiles } from './clans-with-members-profiles.actions';

export const ClansWithMembersProfilesReducer = createReducer(
  initialClanWithMembersAndProfileState,
  // on(addClan, (state, { clanId, clanName, clanTag }) => {
  //   const clans = state.ids.map((c) => c);

  //   if (clans.indexOf(clanId) === -1) {
  //     return ClanConfigAdapter.upsertOne({ clanId, clanName, clanTag, ...DefaultClanConfig }, { ...state });
  //   }

  //   return {
  //     ...state
  //   };
  // }),
  // on(resetClan, (state, { clanId, clanName, clanTag }) => {
  //   return ClanConfigAdapter.upsertOne({ clanId, clanName, clanTag, ...DefaultClanConfig }, { ...state });
  // }),
  // on(updateClan, (state, { clan }): ClansState => {
  //   return ClanConfigAdapter.upsertOne(clan, { ...state });
  // }),
  // on(removeClan, (state, { clanId }): ClansState => {
  //   return ClanConfigAdapter.removeOne(clanId, { ...state });
  // }),
  on(
    setClansWMembersProfiles,
    (state, { clanWithMembersProfiles }): ClansWithMembersAndProfilesState =>
      ClanWithMembersProfilesConfigAdapter.setAll(clanWithMembersProfiles, { ...state })
  )
);
