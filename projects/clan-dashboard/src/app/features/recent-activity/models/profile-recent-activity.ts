import { ActivityStats, MemberProfile } from '@destiny/data/models';
import { MemberActivityTime } from 'projects/data/src/lib/models/MemberActivityTime';
import { GroupsV2GroupMember } from 'bungie-api-angular';

export interface ProfileRecentActivity {
  clan: {
    clanId: string;
    clanName: string;
    clanTag: string;
  };
  clanMember: GroupsV2GroupMember;
  profile: MemberProfile;
  profileActivity: ActivityStats;
}
