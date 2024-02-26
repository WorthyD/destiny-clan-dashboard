import { TABLE_DONE, TABLE_NOT_DONE } from '@core/constants';
import { ViewerMetadata } from '@destiny-clan-dashboard/components';

import { getBungieDisplayName, getMemberName } from '@destiny-clan-dashboard/shared/utils';
import { SealClanMember } from '../../models/seal-clan-member';

import { ProfileLinkComponent } from '@destiny-clan-dashboard/components/shared/profile-link';

interface ViewContext {
  item: SealClanMember;
}

export const SEAL_DETAILS_VIEWER_METADATA = new Map<string, ViewerMetadata<SealClanMember, ViewContext>>([
  // [
  //   'destinyDisplayName',
  //   {
  //     label: 'Destiny Display Name',
  //     labelClass: '',
  //     plainText: (item: SealClanMember) => `${getMemberName(item.clanMember)}`,
  //     render: (item: SealClanMember) => ({ text: `${getMemberName(item.clanMember)}` })
  //   }
  // ],
  [
    'bungieUnique',
    {
      label: 'Bungie Display Name',
      labelClass: '',
      plainText: (item: SealClanMember) => `${getBungieDisplayName(item?.profile) || ''}`,
      // plainText: (item: ClanRosterItem) => ``,
      //  render: (item: SealClanMember) => ({ text: `${getBungieDisplayName(item?.profile) || ''}`, classList: [] })
      render: (item: SealClanMember) => ({
        component: ProfileLinkComponent,
        data: { profile: item?.profile }
      })
    }
  ],
  [
    'destinyClan',
    {
      label: 'Destiny Clan',
      labelClass: '',
      plainText: (item: SealClanMember) => `${item.clan.clanName}`,
      render: (item: SealClanMember) => ({ text: `${item.clan.clanName}` })
    }
  ],
  [
    'isComplete',
    {
      label: 'Is Completed',
      labelClass: 'header-text-center',
      plainText: (item: SealClanMember) => (item.sealProgression.isCompleted ? 'X' : ''),
      render: (item: SealClanMember) => ({
        classList: ['text-center'],
        text: item.sealProgression.isCompleted ? TABLE_DONE : TABLE_NOT_DONE
      })
    }
  ],
  [
    'isGilded',
    {
      label: 'Is Gilded',
      labelClass: 'header-text-center',
      plainText: (item: SealClanMember) => (item.sealProgression.isGilded ? 'X' : ''),
      render: (item: SealClanMember) => ({
        classList: ['text-center'],
        text: item.sealProgression.isGilded ? TABLE_DONE : TABLE_NOT_DONE
      })
    }
  ],
  [
    'gildedCount',
    {
      label: 'Gilded Count',
      labelClass: 'header-text-center',
      plainText: (item: SealClanMember) => `${item.sealProgression.gildedCount || ''}`,
      render: (item: SealClanMember) => ({
        classList: ['text-center'],
        text: `${item.sealProgression.gildedCount || ''}`
      })
    }
  ],
  [
    'completeCount',
    {
      label: 'Completed / Total',
      labelClass: 'header-text-center',
      plainText: (item: SealClanMember) =>
        `${item.sealProgression.completedTriumphCount || 0} / ${item.sealProgression.totalTriumphCount}`,
      render: (item: SealClanMember) => ({
        classList: ['text-center'],
        text: `${item.sealProgression.completedTriumphCount || 0} / ${item.sealProgression.totalTriumphCount}`
      })
    }
  ],
  [
    'progress',
    {
      label: 'Percent Completed',
      labelClass: 'header-text-center',
      plainText: (item: SealClanMember) => `${item.sealProgression.completionPercentage}%`,
      render: (item: SealClanMember) => ({
        classList: ['text-center'],
        text: `${item.sealProgression.completionPercentage}%`
      })
    }
  ]

  //['name', { label: 'Name', render: (item) => ({ text: `${item.name}` }) }],
  //['startDate', { label: 'Start Date', render: (item) => ({ text: `${new Date(item.startDate).toDateString()}` }) }]
]);
