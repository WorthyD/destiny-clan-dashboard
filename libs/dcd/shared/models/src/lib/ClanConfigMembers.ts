import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ClanConfig } from './ClanConfig';

export interface ClanConfigMembers {
  clanConfig: ClanConfig;
  members: GroupsV2GroupMember[];
  profiles?: any[];
}
