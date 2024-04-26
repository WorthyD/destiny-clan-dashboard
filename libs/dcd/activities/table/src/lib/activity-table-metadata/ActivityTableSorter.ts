
import { SorterMetadata } from '@destiny-clan-dashboard/shared/data';
import { compare, getBungieDisplayName } from '@destiny-clan-dashboard/shared/utils';
import { ClanMemberProfile } from '@dcd/shared/models';

export const ACTIVITY_SORTER_METADATA = new Map<string, SorterMetadata<ClanMemberProfile>>([

  // [
  //   'destinyDisplayName',
  //   {
  //     label: 'Destiny Display Name',
  //     comparator: (a, b) =>
  //       a.profile?.profile?.data.userInfo.displayName?.toLowerCase() <
  //       b.profile?.profile?.data.userInfo.displayName?.toLowerCase()
  //         ? -1
  //         : 1
  //   }
  // ],
  [
    'destinyDisplayName',
    {
      label: 'Bungie Display Name',
      comparator: (a, b) =>
        compare(getBungieDisplayName(a.profile).toLowerCase(), getBungieDisplayName(b.profile).toLowerCase())
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
