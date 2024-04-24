import { ActivityStats, MemberActivityRecentStats, MemberProfile } from '@destiny-clan-dashboard/data/models';
import { GroupsV2GroupMember } from 'bungie-api-angular/lib/model/groupsV2GroupMember';
// import { GroupsV2GroupMember } from 'bungie-api-angular';

export interface ProfileRecentActivity {
  clan: {
    clanId: string;
    clanName: string;
    clanTag: string;
  };
  member: GroupsV2GroupMember;
  profile: MemberProfile;
  stats: MemberActivityRecentStats;
}
