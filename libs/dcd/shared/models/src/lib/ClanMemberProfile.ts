import { MemberProfile } from '@destiny-clan-dashboard/data/models';
import { GroupsV2GroupMember } from 'bungie-api-angular/lib/model/groupsV2GroupMember';

export interface ClanMemberProfile {
  clan: {
    clanId: string;
    clanName: string;
    clanTag: string;
  };
  member: GroupsV2GroupMember;
  profile: MemberProfile;
}
export interface ClanMemberProfileWSeason extends ClanMemberProfile {
  seasonPass: number;
}
