import { ViewerMetadata } from '@destiny/components';

import { BungieDatePipe, BungieDateTimePipe } from '@destiny/components/pipes/bungie-date';
import { getMemberName } from '@destiny/data/utility';
import { SealClanMember } from '../../models/seal-clan-member';

interface ViewContext {
  item: SealClanMember;
}

export const SEAL_DETAILS_VIEWER_METADATA = new Map<string, ViewerMetadata<SealClanMember, ViewContext>>([
  [
    'destinyDisplayName',
    {
      label: 'Destiny Display Name',
      plainText: (item: SealClanMember) => `${getMemberName(item.clanMember)}`,
      render: (item: SealClanMember) => ({ text: `${getMemberName(item.clanMember)}` })
    }
  ],
  [
    'destinyClan',
    {
      label: 'Destiny Clan',
      plainText: (item: SealClanMember) => `${item.clan.clanName}`,
      render: (item: SealClanMember) => ({ text: `${item.clan.clanName}` })
    }
  ],
  [
    'isComplete',
    {
      label: 'Is Completed',
      plainText: (item: SealClanMember) => (item.sealProgression.isCompleted ? 'X' : ''),
      render: (item: SealClanMember) => ({
        text: item.sealProgression.isCompleted ? 'X' : ''
      })
    }
  ],
  [
    'completeCount',
    {
      label: 'Completed Count',
      plainText: (item: SealClanMember) =>
        `${item.sealProgression.completedTriumphCount || 0} / ${item.sealProgression.totalTriumphCount}`,
      render: (item: SealClanMember) => ({
        text: `${item.sealProgression.completedTriumphCount || 0} / ${item.sealProgression.totalTriumphCount}`
      })
    }
  ],
  [
    'progress',
    {
      label: 'Percent Completed',
      plainText: (item: SealClanMember) => `${item.sealProgression.completionPercentage}%`,
      render: (item: SealClanMember) => ({
        text: `${item.sealProgression.completionPercentage}%`
      })
    }
  ]

  //['name', { label: 'Name', render: (item) => ({ text: `${item.name}` }) }],
  //['startDate', { label: 'Start Date', render: (item) => ({ text: `${new Date(item.startDate).toDateString()}` }) }]
]);
