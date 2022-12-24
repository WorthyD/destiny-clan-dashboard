import { createAction, props } from '@ngrx/store';
import { ClanConfig } from './clans.state';

const base = '[Clans] - ';
const name = (sr) => `${base}${sr}`;

export const setClans = createAction(name('Set Clans'), props<{ clanIds: ClanConfig[] }>());
export const addClan = createAction(name('Add Clan'), props<{ clanId: string; clanName: string; clanTag: string }>());
export const updateClan = createAction(name('Update Clan'), props<{ clan: ClanConfig }>());
export const removeClan = createAction(name('Remove Clan'), props<{ clanId: string }>());

export const updateClanProfileSync = createAction(name('Update Clan Sync'), props<{ clanId: string }>());
export const updateClanMemberActivitySync = createAction(name('Update Clan Activity Sync'), props<{ clanId: string }>());
