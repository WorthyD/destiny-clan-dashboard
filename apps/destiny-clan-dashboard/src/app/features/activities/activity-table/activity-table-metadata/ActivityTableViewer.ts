import { ViewerMetadata } from '@destiny-clan-dashboard/components';
import { getBungieDisplayName } from '@destiny-clan-dashboard/data/utility';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { ProfileLinkComponent } from '@destiny-clan-dashboard/components/shared/profile-link';

interface ViewContext {
  item: ClanMemberProfile;
}
export const ACTIVITY_VIEWER_METADATA = new Map<string, ViewerMetadata<ClanMemberProfile, ViewContext>>([
  // [
  //   'playerName',
  //   {
  //     label: 'Display Name',
  //     isSticky: true,
  //     plainText: (item: ClanMemberProfile) => `${item.member?.destinyUserInfo?.displayName}`,
  //     render: (item: ClanMemberProfile) => {
  //       return {
  //         text: `${item.member?.destinyUserInfo?.displayName}`
  //       };
  //     }
  //   }
  // ],
  [
    'bungieUnique',
    {
      label: 'Bungie Display Name',
      labelClass: '',
      isSticky: true,
      plainText: (item: ClanMemberProfile) => `${getBungieDisplayName(item?.profile) || ''}`,
      // plainText: (item: ClanRosterItem) => ``,
      //render: (item: ClanMemberProfile) => ({ text: `${getBungieDisplayName(item?.profile) || ''}`, classList: [] }),
      render: (item: ClanMemberProfile) => ({
        component: ProfileLinkComponent,
        data: { profile: item?.profile }
      })
    }
  ],
  [
    'clanName',
    {
      label: 'Clan Name',
      plainText: (item: ClanMemberProfile) => `${item.clan.clanName}`,
      render: (item: ClanMemberProfile) => {
        return {
          text: `${item.clan.clanName}`
        };
      }
    }
  ]
]);
