import { createAction, props } from '@ngrx/store';
import { ClanMemberProfileWID } from './clan-members-profiles.state';

const base = '[ClansMemberPorfile] - ';
const name = (sr) => `${base}${sr}`;

export const initializeClanMemberProfiles = createAction(name('Initialize ClanMemberProfiles'));
export const setClanMemberProfiles = createAction(name('Set ClanMemberProfiles'), props<{ clanMemberProfiles: ClanMemberProfileWID[] }>());
