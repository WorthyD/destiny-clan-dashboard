
import { SorterMetadata } from '@destiny/components';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';

export const ACTIVITY_SORTER_METADATA = new Map<string, SorterMetadata<ClanMemberProfile>>([

  [
    'destinyDisplayName',
    {
      label: 'Destiny Display Name',
      comparator: (a, b) =>
        a.profile?.profile?.data.userInfo.displayName?.toLowerCase() <
        b.profile?.profile?.data.userInfo.displayName?.toLowerCase()
          ? -1
          : 1
    }
  ],
  [
    'clanName',
    {
      label: 'Clan Name',
      comparator: (a, b) => (a.clan.clanName?.toLowerCase() < b.clan.clanName?.toLowerCase() ? -1 : 1)
    }
  ]
]);
