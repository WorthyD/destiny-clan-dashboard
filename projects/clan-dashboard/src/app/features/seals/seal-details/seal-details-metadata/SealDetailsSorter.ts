import { SorterMetadata } from '@destiny/components';
import { getMemberName } from '@destiny/data/utility';
import { SealClanMember } from '../../models/seal-clan-member';

export const SEAL_DETAILS_SORTER_METADATA = new Map<string, SorterMetadata<SealClanMember>>([
  [
    'destinyDisplayName',
    {
      label: 'Destiny Display Name',
      comparator: (a, b) =>
        getMemberName(a.clanMember).toLowerCase() < getMemberName(b.clanMember).toLowerCase() ? -1 : 1
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
    'progress',
    {
      label: 'Progress',
      comparator: (a, b) => (a.sealProgression.completionPercentage < b.sealProgression.completionPercentage ? -1 : 1)
    }
  ],
  [
    'gildedCount',
    {
      label: 'Gilded Count',
      comparator: (a, b) => (a.sealProgression.gildedCount < b.sealProgression.gildedCount ? -1 : 1)
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
      comparator: (a, b) => (a.sealProgression.gildedCount < b.sealProgression.gildedCount ? -1 : 1)
    }
  ]
]);
