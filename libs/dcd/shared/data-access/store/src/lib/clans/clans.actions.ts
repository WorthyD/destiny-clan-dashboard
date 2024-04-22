import { ClanConfig } from '@dcd/shared/models';
import { createAction, props } from '@ngrx/store';

const base = '[Clans] - ';
const name = (sr: string) => `${base}${sr}`;

export const setClans = createAction(name('Set Clans'), props<{ clanIds: ClanConfig[] }>());
export const addClan = createAction(name('Add Clan'), props<{ clanId: string; clanName: string; clanTag: string }>());
export const resetClan = createAction(
  name('Reset Clan'),
  props<{ clanId: string; clanName: string; clanTag: string }>()
);
export const updateClan = createAction(name('Update Clan'), props<{ clan: ClanConfig }>());
export const removeClan = createAction(name('Remove Clan'), props<{ clanId: string }>());

export const updateClanProfileSync = createAction(name('Update Clan Sync'), props<{ clanId: string }>());
export const updateClanMemberActivitySync = createAction(
  name('Update Clan Activity Sync'),
  props<{ clanId: string }>()
);
export const updateBungieInfoSync = createAction(name('Update Bungie Info Sync'), props<{ clanId: string }>());

export const initializeClanItems = createAction(name('Initialize'));
