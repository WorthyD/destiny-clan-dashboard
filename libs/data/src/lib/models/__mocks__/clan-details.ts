import { GroupsV2GroupV2 } from 'bungie-api-angular/lib/model/groupsV2GroupV2';
import { ClanDetails } from '../ClanDetails';

export const getMockClan = (overrideClan: Partial<ClanDetails>): ClanDetails => {
  return {
    ...MOCK_CLAN,
    ...overrideClan
  };
};
export const MOCK_CLAN: ClanDetails = {
  groupId: '2073131',
  name: 'DoD Paternal Chums',
  groupType: 1,
  membershipIdCreated: 22807,
  creationDate: '2017-08-24T21:26:26.668Z',
  modificationDate: '2022-04-09T00:14:51.491Z',
  about: 'About Stuff',
  tags: [],
  memberCount: 93,
  isPublic: true,
  isPublicTopicAdminOnly: false,
  motto: 'Dads of Destiny PC',
  allowChat: true,
  isDefaultPostPublic: false,
  chatSecurity: 0,
  locale: 'en',
  avatarImageIndex: 0,
  homepage: 0,
  membershipOption: 2,
  defaultPublicity: 2,
  theme: 'Group_Community1',
  bannerPath: '/img/Themes/Group_Community1/struct_images/group_top_banner.jpg',
  avatarPath: '/img/profile/avatars/group/defaultGroup.png',
  conversationId: '27030166',
  enableInvitationMessagingForAdmins: false,
  banExpireDate: '2001-01-01T00:00:00Z',
  features: {
    maximumMembers: 100,
    maximumMembershipsOfGroupType: 1,
    capabilities: 31,
    membershipTypes: [1, 2, 3, 5, 6],
    invitePermissionOverride: true,
    updateCulturePermissionOverride: false,
    hostGuidedGamePermissionOverride: 1,
    updateBannerPermissionOverride: false,
    joinLevel: 1
  },
  clanInfo: {
    d2ClanProgressions: {
      '584850370': {
        progressionHash: 584850370,
        dailyProgress: 200000,
        dailyLimit: 0,
        weeklyProgress: 100000,
        weeklyLimit: 100000,
        currentProgress: 200000,
        level: 2,
        levelCap: 6,
        stepIndex: 2,
        progressToNextLevel: 100000,
        nextLevelAt: 125000
      },
      '1273404180': {
        progressionHash: 1273404180,
        dailyProgress: 0,
        dailyLimit: 0,
        weeklyProgress: 0,
        weeklyLimit: 0,
        currentProgress: 0,
        level: 1,
        levelCap: 6,
        stepIndex: 1,
        progressToNextLevel: 0,
        nextLevelAt: 1
      },
      '3381682691': {
        progressionHash: 3381682691,
        dailyProgress: 0,
        dailyLimit: 0,
        weeklyProgress: 0,
        weeklyLimit: 0,
        currentProgress: 0,
        level: 1,
        levelCap: 6,
        stepIndex: 1,
        progressToNextLevel: 0,
        nextLevelAt: 1
      },
      '3759191272': {
        progressionHash: 3759191272,
        dailyProgress: 0,
        dailyLimit: 0,
        weeklyProgress: 0,
        weeklyLimit: 0,
        currentProgress: 0,
        level: 1,
        levelCap: 6,
        stepIndex: 1,
        progressToNextLevel: 0,
        nextLevelAt: 1
      }
    },
    clanCallsign: 'DoD'
  }
};
