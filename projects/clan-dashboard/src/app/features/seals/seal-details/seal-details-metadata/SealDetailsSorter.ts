import { SorterMetadata } from '@destiny/components';
import { compare, getBungieDisplayName, getMemberName } from '@destiny/data/utility';
import { SealClanMember } from '../../models/seal-clan-member';
const sortNumeric = (a: number, b: number) => {
  return a < b ? -1 : 1;
};

export const SEAL_DETAILS_SORTER_METADATA = new Map<string, SorterMetadata<SealClanMember>>([
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
      comparator: (a, b) => compare(a.clan.clanName, b.clan.clanName)
    }
  ],
  [
    'progress',
    {
      label: 'Progress',
      comparator: (a, b) => compare(a.sealProgression.completionPercentage, b.sealProgression.completionPercentage)
    }
  ],
  [
    'gildedCount',
    {
      label: 'Gilded Count',
      comparator: (a, b) => compare(a.sealProgression.gildedCount, b.sealProgression.gildedCount)
    }
  ],
  [
    'isComplete',
    {
      label: 'Is Completed',
      comparator: (a: any, b: any) => a.sealProgression.isCompleted - b.sealProgression.isCompleted
    }
  ],
  [
    'isGilded',
    {
      label: 'Is Gilded',
      comparator: (a: any, b: any) => a.sealProgression.isGilded - b.sealProgression.isGilded
    }
  ],
  [
    'gildedCount',
    {
      label: 'Gilded Count',
      // comparator: (a, b) => (a.sealProgression.gildedCount < b.sealProgression.gildedCount ? -1 : 1)
      comparator: (a, b) => compare(a.sealProgression.gildedCount || -10, b.sealProgression.gildedCount || -10)
    }
  ]
]);
