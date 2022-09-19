import { createAction, props } from '@ngrx/store';

const base = 'Clans] - ';
const name = (sr) => `${base}${sr}`;

export const setClans = createAction(name('Set Clans'), props<{ clanIds: [] }>());
export const addClan = createAction(name('Add Clan'), props<{ clanId: string }>());
export const removeClan = createAction(name('Remove Clan'), props<{ clanId: string }>());
