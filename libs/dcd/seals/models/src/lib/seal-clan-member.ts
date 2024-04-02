import { MemberProfile } from '@dcd/shared/models';
import { GroupsV2GroupMember } from 'bungie-api-angular';

export interface SealClanMember {
  clanMember: GroupsV2GroupMember;
  profile: MemberProfile;
  clan: {
    clanId: string;
    clanName: string;
    clanTag: string;
  };
  sealProgression: {
    completedTriumphCount: number;
    totalTriumphCount:number;
    completionPercentage: number;
    isCompleted: boolean;
    isGilded: boolean;
    gildedCount: number;
  };
}
