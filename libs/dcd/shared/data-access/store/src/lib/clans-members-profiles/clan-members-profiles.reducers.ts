// import { createReducer, on } from '@ngrx/store';

// import {
//   initialClanMemberProfileState,
//   ClansMembersProfilesState,
//   ClansMembersProfilesAdapter
// } from './clan-members-profiles.state';

// import { setClanMemberProfiles, initializeClanMemberProfiles } from './clan-members-profiles.actions';

// export const ClansMembersProfilesReducer = createReducer(
//   initialClanMemberProfileState,
//   on(initializeClanMemberProfiles, (state): ClansMembersProfilesState => ({ ...state, isLoading: true })),
//   on(
//     setClanMemberProfiles,
//     (state, { clanMemberProfiles }): ClansMembersProfilesState =>
//       ClansMembersProfilesAdapter.setAll(clanMemberProfiles, { ...state, isLoading: false })
//   )
// );
