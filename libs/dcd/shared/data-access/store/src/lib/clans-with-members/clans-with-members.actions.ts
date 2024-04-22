import { createAction, props } from '@ngrx/store';
import { ClanWithMembers } from './clans-with-members.state';

const base = '[Clans w/ Members] - ';
const name = (sr: string) => `${base}${sr}`;

export const setClansWMembers = createAction(name('Set Clans'), props<{ clanWithMembers: ClanWithMembers[] }>());
export const initializeClanWithMembers = createAction(name('Initialize'));
