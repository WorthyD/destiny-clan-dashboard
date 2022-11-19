import { MemberProfile } from './MemberProfile';

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
  memberProfile: MemberProfile;
  stats: any;
}
