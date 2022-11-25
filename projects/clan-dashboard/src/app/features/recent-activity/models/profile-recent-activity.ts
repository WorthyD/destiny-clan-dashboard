import { ActivityStats, MemberProfile } from '@destiny/data/models';
import { MemberActivityTime } from 'projects/data/src/lib/models/MemberActivityTime';

export interface ProfileRecentActivity {
  clan: {
    clanId: string;
    clanName: string;
    clanTag: string;
  };
  profile: MemberProfile;
  profileActivity: ActivityStats;
}
