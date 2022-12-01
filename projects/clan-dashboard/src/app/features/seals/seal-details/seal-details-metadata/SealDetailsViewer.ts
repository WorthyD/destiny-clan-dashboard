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
      render: (item: SealClanMember) => ({ text: `${getMemberName(item.clanMember)}` })
    }
  ],
  [
    'destinyClan',
    {
      label: 'Destiny Clan',
      render: (item: SealClanMember) => ({ text: `${item.clan.clanName}` })
    }
  ],
  [
    'isComplete',
    {
      label: 'Is Completed',
      render: (item: SealClanMember) => ({
        text: item.sealProgression.isCompleted ? 'X' : ''
      })
    }
  ],
  [
    'completeCount',
    {
      label: 'Completed Count',
      render: (item: SealClanMember) => ({
        text: `${item.sealProgression.completedTriumphCount || 0} / ${item.sealProgression.totalTriumphCount}`
      })
    }
  ],
  [
    'progress',
    {
      label: 'Percent Completed',
      render: (item: SealClanMember) => ({
        text: `${item.sealProgression.completionPercentage}%`
      })
    }
  ]

  //['name', { label: 'Name', render: (item) => ({ text: `${item.name}` }) }],
  //['startDate', { label: 'Start Date', render: (item) => ({ text: `${new Date(item.startDate).toDateString()}` }) }]
]);
