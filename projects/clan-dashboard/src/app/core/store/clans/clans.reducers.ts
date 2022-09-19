import { createReducer, on } from '@ngrx/store';
import { initialClanState, ClansState } from './clans.state';
import { addClan, removeClan, setClans } from './clans.actions';

export const ClansReducer = createReducer(
  initialClanState,
  on(addClan, (state, { clanId }): ClansState => {
    const clans = state.clans;
    if (clans.indexOf(clanId) === -1) {
      state.clans.push(clanId);
    }
    return {
      ...state,
      clans
    };
  }),
  on(removeClan, (state, { clanId }): ClansState => {
    const clans = state.clans;

    const indexOfClan = clans.indexOf(clanId);
    if (indexOfClan > -1) {
      clans.slice(indexOfClan, 1);
    }

    return {
      ...state,
      clans
    };
  }),
  on(
    setClans,
    (state, { clanIds }): ClansState => ({
      ...state,
      clans: clanIds
    })
  )
);
