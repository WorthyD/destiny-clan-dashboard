import { BungieInfo } from '@dcd/shared/models';

export const getFakeStaticBungieInfo = (override?: Partial<BungieInfo>): BungieInfo => {
  return {
    membershipId: '612698',
    uniqueName: 'WorthyD#2742',
    displayName: 'WorthyD',
    profilePicture: 70319,
    profileTheme: 1127,
    userTitle: 0,
    successMessageFlags: 0,
    isDeleted: false,
    about: 'Dad, Web Programmer, Wanna Be Gamer',
    firstAccess: '2009-11-21T15:17:08.447Z',
    lastUpdate: '2021-08-25T13:34:10.725Z',
    psnDisplayName: 'WorthyD',
    xboxDisplayName: 'WorthyD3136',
    showActivity: true,
    locale: 'en',
    localeInheritDefault: true,
    showGroupMessaging: true,
    profilePicturePath: '/img/profile/avatars/odst_buck.gif',
    profileThemeName: 'd2_27',
    userTitleDisplay: 'Newbie',
    statusText: '',
    statusDate: '0001-01-01T00:00:00Z',
    blizzardDisplayName: 'WorthyD',
    steamDisplayName: 'WorthyD',
    twitchDisplayName: 'WorthyD',
    cachedBungieGlobalDisplayName: 'WorthyD',
    cachedBungieGlobalDisplayNameCode: 2742
  };
};
