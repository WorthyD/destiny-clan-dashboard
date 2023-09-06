import { createAction, props } from '@ngrx/store';
// import { ClanWithMembers } from './clans-with-members.state';
import {ClanWithMembersAndProfiles} from './clans-with-members-profiles.state';

const base = '[Clans w/ Members &  Profiles] - ';
const name = (sr) => `${base}${sr}`;

 export const setClansWMembersProfiles = createAction(name('Set Clans'), props<{ clanWithMembersProfiles: ClanWithMembersAndProfiles[] }>());
// export const initializeClanWithMembers = createAction(name('Initialize'));
//export const addClan = createAction(name('Add Clan'), props<{ clanId: string; clanName: string; clanTag: string }>());
// export const resetClan = createAction(name('Reset Clan'), props<{ clanId: string; clanName: string; clanTag: string }>());
// export const updateClan = createAction(name('Update Clan'), props<{ clan: ClanConfig }>());
// export const removeClan = createAction(name('Remove Clan'), props<{ clanId: string }>());

//export const updateClanProfileSync = createAction(name('Update Clan Sync'), props<{ clanId: string }>());
//export const updateClanMemberActivitySync = createAction(name('Update Clan Activity Sync'), props<{ clanId: string }>());
//export const updateBungieInfoSync = createAction(name('Update Bungie Info Sync'), props<{ clanId: string }>());
