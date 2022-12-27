import { ViewerMetadata } from '@destiny/components';
import { BungieDateTimePipe } from '@destiny/components/pipes';
import { PlaytimePipe } from '@destiny/components/pipes/playtime';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';

interface ViewContext {
  item: ClanMemberProfile;
}
export const ACTIVITY_VIEWER_METADATA = new Map<string, ViewerMetadata<ClanMemberProfile, ViewContext>>([
  [
    'playerName',
    {
      label: 'Display Name',
      isSticky: true,
      plainText: (item: ClanMemberProfile) => `${item.member?.destinyUserInfo?.displayName}`,
      render: (item: ClanMemberProfile) => {
        return {
          text: `${item.member?.destinyUserInfo?.displayName}`
        };
      }
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
