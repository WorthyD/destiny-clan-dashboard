import { GroupsV2GroupMember } from 'bungie-api-angular';
import { Observable } from 'rxjs';

export interface ClanMembersServiceInterface {
  getClanMembersSerialized: (clanId: string) => Observable<GroupsV2GroupMember[]>;
}
