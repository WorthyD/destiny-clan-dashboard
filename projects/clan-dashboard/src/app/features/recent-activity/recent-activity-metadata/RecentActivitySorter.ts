// import { SorterMetadata } from '../data/sorter';

import { SorterMetadata } from '@destiny/components';
import { ProfileRecentActivity } from '../models/profile-recent-activity';

// import { MockListItem } from './ListItems';
export const RECENT_ACTIVITY_SORTER_METADATA = new Map<string, SorterMetadata<ProfileRecentActivity>>([
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
  ],
  [
    'lastWeek',
    {
      label: 'Last Week',
      comparator: (a, b) => ((a.profileActivity.stats.lastWeek || 0) < (b.profileActivity.stats.lastWeek || 0) ? -1 : 1)
    }
  ],

  [
    'lastMonth',
    {
      label: 'Last Month',
      comparator: (a, b) =>
        (a.profileActivity.stats.lastMonth || 0) < (b.profileActivity.stats.lastMonth || 0) ? -1 : 1
    }
  ],
  [
    'lastNinety',
    {
      label: 'Last 90',
      comparator: (a, b) =>
        (a.profileActivity.stats.lastNinetyDays || 0) < (b.profileActivity.stats.lastNinetyDays || 0) ? -1 : 1
    }
  ],
  [
    'lastLogin',
    {
      label: 'Last Login',
      comparator: (a, b) =>
        (new Date(a.profile.profile.data.dateLastPlayed) || new Date(1 / 1 / 1900)) <
        (new Date(b.profile.profile.data.dateLastPlayed) || new Date(1 / 1 / 1900))
          ? -1
          : 1
    }
  ]
]);
