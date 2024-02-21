import { createReducer, on } from '@ngrx/store';
import { initialClanState, ClansWithMembersState, ClanWithMembersConfigAdapter } from './clans-with-members.state';
import { setClansWMembers } from './clans-with-members.actions';

export const ClansWithMembersReducer = createReducer(
  initialClanState,
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
  on(setClansWMembers, (state, { clanWithMembers }): ClansWithMembersState => ClanWithMembersConfigAdapter.setAll(clanWithMembers, { ...state }))
);
