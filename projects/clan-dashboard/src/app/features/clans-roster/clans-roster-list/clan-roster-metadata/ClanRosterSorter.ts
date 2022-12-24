// import { SorterMetadata } from '../data/sorter';

import { SorterMetadata } from '@destiny/components';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';

// import { MockListItem } from './ListItems';
export const CLAN_ROSTER_SORTER_METADATA = new Map<string, SorterMetadata<ClanMemberProfile>>([
  //   [
  //     'id',
  //     {
  //       label: 'ID',
  //       comparator: (a, b) => (a.id < b.id ? -1 : 1)
  //     }
  //   ],
  [
    'destinyDisplayName',
    {
      label: 'Destiny Display Name',
      comparator: (a, b) =>
        a.member?.destinyUserInfo?.displayName?.toLowerCase() < b.member?.destinyUserInfo?.displayName?.toLowerCase()
          ? -1
          : 1
    }
  ],
  [
    'bungieDisplayName',
    {
      label: 'Bungie Display Name',
      comparator: (a, b) =>
        a.member?.bungieNetUserInfo?.displayName?.toLowerCase() <
        b.member?.bungieNetUserInfo?.displayName?.toLowerCase()
          ? -1
          : 1
    }
  ],
  [
    'platform',
    {
      label: 'Platform',
      comparator: (a, b) => (a.member?.destinyUserInfo?.membershipType < b.member?.destinyUserInfo?.membershipType ? -1 : 1)
    }
  ],
  [
    'powerLevel',
    {
      label: 'Power Level',
      comparator: (a, b) =>
        a.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus <
        b.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus
          ? -1
          : 1
    }
  ],
  [
    'activeTriumph',
    {
      label: 'Active Triumph',
      comparator: (a, b) =>
        a.profile?.profileRecords?.data?.activeScore < b.profile?.profileRecords?.data?.activeScore ? -1 : 1
    }
  ],
  [
    'lifetimeTriumph',
    {
      label: 'Lifetime Triumph',
      comparator: (a, b) =>
        a.profile?.profileRecords?.data?.lifetimeScore < b.profile?.profileRecords?.data?.lifetimeScore ? -1 : 1
    }
  ],
  [
    'clanName',
    {
      label: 'Clan Name',
      comparator: (a, b) => (a.clan.clanName < b.clan.clanName ? -1 : 1)
    }
  ],

  [
    'joinDate',
    {
      label: 'Join Date',
      comparator: (a, b) => (new Date(a.member?.joinDate) < new Date(b.member?.joinDate) ? -1 : 1)
    }
  ],
  [
    'dateLastPlayed',
    {
      label: 'Date Last Played',
      comparator: (a, b) =>
        new Date(a.profile?.profile.data.dateLastPlayed) < new Date(b.profile?.profile.data.dateLastPlayed) ? -1 : 1
    }
  ]
]);
