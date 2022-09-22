import { createReducer, on } from '@ngrx/store';
import { initialClanState, ClansState, ClanConfigAdapter, DefaultClanConfig } from './clans.state';
import { addClan, removeClan, setClans } from './clans.actions';

export const ClansReducer = createReducer(
  initialClanState,
  on(addClan, (state, { clanId }) => {
    const clans = state.ids.map((c) => c);

    console.log(clans);
    if (clans.indexOf(clanId) === -1) {
      //const newClangConfig = {}
      return ClanConfigAdapter.upsertOne({ clanId, ...DefaultClanConfig }, { ...state });
    }

    return {
      ...state
    };
  }),
  on(removeClan, (state, { clanId }): ClansState => {
    return ClanConfigAdapter.removeOne(clanId, { ...state });
  }),
  on(setClans, (state, { clanIds }): ClansState => ClanConfigAdapter.setAll(clanIds, { ...state }))
);
