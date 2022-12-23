import { MemberProfile } from "@destiny/data/models";
import { GroupsV2GroupMember } from "bungie-api-angular";

export interface ClanMemberProfile {
  clan: {
    clanId: string;
    clanName: string;
    clanTag: string;
  };
  member: GroupsV2GroupMember;
  profile: MemberProfile;
}
