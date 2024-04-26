// import { AppState } from '../../core.state';
// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// import { ClanMemberProfile } from '@dcd/shared/models';

// export interface ClanMemberProfileWID extends ClanMemberProfile {
//   id: string;
// }

// export interface ClansMembersProfilesState extends EntityState<ClanMemberProfileWID> {
//   isLoading: boolean;
// }

// export const ClansMembersProfilesAdapter: EntityAdapter<ClanMemberProfileWID> =
//   createEntityAdapter<ClanMemberProfileWID>({
//     selectId: (cc: ClanMemberProfileWID) => cc.id,
//     sortComparer: false
//   });

// export const initialClanMemberProfileState: ClansMembersProfilesState = ClansMembersProfilesAdapter.getInitialState({
//   isLoading: true
// });

// export interface State extends AppState {
//   clansMembersProfiles: ClansMembersProfilesState;
// }
