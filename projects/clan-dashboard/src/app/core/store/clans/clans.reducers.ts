import { createReducer, on } from '@ngrx/store';
import { initialClanState, ClansState, ClanConfigAdapter, DefaultClanConfig } from './clans.state';
import { addClan, removeClan, setClans, updateClanProfileSync, updateClan, resetClan } from './clans.actions';

export const ClansReducer = createReducer(
  initialClanState,
  on(addClan, (state, { clanId, clanName, clanTag }) => {
    const clans = state.ids.map((c) => c);

    if (clans.indexOf(clanId) === -1) {
      return ClanConfigAdapter.upsertOne({ clanId, clanName, clanTag, ...DefaultClanConfig }, { ...state });
    }

    return {
      ...state
    };
  }),
  on(resetClan, (state, { clanId, clanName, clanTag }) => {
    return ClanConfigAdapter.upsertOne({ clanId, clanName, clanTag, ...DefaultClanConfig }, { ...state });
  }),
  on(updateClan, (state, { clan }): ClansState => {
    return ClanConfigAdapter.upsertOne(clan, { ...state });
  }),
  on(removeClan, (state, { clanId }): ClansState => {
    return ClanConfigAdapter.removeOne(clanId, { ...state });
  }),
  on(setClans, (state, { clanIds }): ClansState => ClanConfigAdapter.setAll(clanIds, { ...state }))
);
