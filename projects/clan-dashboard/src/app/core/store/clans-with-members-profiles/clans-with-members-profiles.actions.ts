import { createAction, props } from '@ngrx/store';
import { ClanWithMembersAndProfiles } from './clans-with-members-profiles.state';

const base = '[Clans w/ Members &  Profiles] - ';
const name = (sr) => `${base}${sr}`;

export const setClansWMembersProfiles = createAction(
  name('Set Clans'),
  props<{ clanWithMembersProfiles: ClanWithMembersAndProfiles[] }>()
);
