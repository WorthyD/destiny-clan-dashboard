// import { MemberProfile } from './MemberProfile';

export interface Activity {
  displayName: string;
  abbreviatedName: string;
  key: string;
  hashes: number[];
  sortOrder: number;
  isGuidedGames: boolean;
  isVaulted?: boolean;
}
export interface ActivityStats {
  memberProfile: any; // TODO: Map out
  stats: MemberActivityRecentStats;
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
