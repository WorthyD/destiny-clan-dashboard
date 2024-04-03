export interface ClanMember {
  destinyUserInfo?: {
    displayName?: string;
    membershipType?: number;
    membershipId?: string | number;
  };
}

// Local model to work with web workers
export interface MemberProfile {
  profile?: {
    data?: {
      userInfo?: {
        displayName?: string;
        bungieGlobalDisplayName?: string;
        bungieGlobalDisplayNameCode?: number;
        membershipType?: number;
        membershipId?: string  | number;
      };
    };
  };
}
export interface MemberActivityRecentStats {
  id: string;
  activities: MemberActivityRecentStatsActivity[];
  trackedDates: { [key: string]: number };
}
export interface MemberActivityRecentStatsActivity {
  date: string | Date;
  seconds: number;
}
