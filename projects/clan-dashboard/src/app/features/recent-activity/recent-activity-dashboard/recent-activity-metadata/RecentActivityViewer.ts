import { ViewerMetadata } from '@destiny/components';
import { BungieDateTimePipe } from '@destiny/components/pipes';
import { PlaytimePipe } from '@destiny/components/pipes/playtime';
import { ProfileRecentActivity } from '../../models/profile-recent-activity';

interface ViewContext {
  item: ProfileRecentActivity;
  playTimePipe: PlaytimePipe;
  dateTimePipe: BungieDateTimePipe;
}
export const RECENT_ACTIVITY_VIEWER_METADATA = new Map<string, ViewerMetadata<ProfileRecentActivity, ViewContext>>([
  [
    'playerName',
    {
      label: 'Display Name',
      isSticky: true,
      plainText: (item: ProfileRecentActivity) => `${item.clanMember?.destinyUserInfo?.displayName}`,
      render: (item: ProfileRecentActivity) => {
        return {
          text: `${item.clanMember?.destinyUserInfo?.displayName}`
        };
      }
    }
  ],
  [
    'clanName',
    {
      label: 'Clan Name',
      plainText: (item: ProfileRecentActivity) => `${item.clan.clanName}`,
      render: (item: ProfileRecentActivity) => {
        return {
          text: `${item.clan.clanName}`
        };
      }
    }
  ],
  // [
  //   'lastWeek',
  //   {
  //     label: 'Last Week',
  //     plainText: (item: ProfileRecentActivity, context: ViewContext) =>
  //       `${context.playTimePipe.transform(item.profileActivity.stats.lastWeek)}`,
  //     render: (item: ProfileRecentActivity, context: ViewContext) => {
  //       return {
  //         text: `${context.playTimePipe.transform(item.profileActivity.stats.lastWeek)}`
  //       };
  //     }
  //   }
  // ],
  // [
  //   'lastMonth',
  //   {
  //     label: 'Last Month',
  //     plainText: (item: ProfileRecentActivity, context: ViewContext) =>
  //       `${context.playTimePipe.transform(item.profileActivity.stats.lastMonth)}`,
  //     render: (item: ProfileRecentActivity, context: ViewContext) => {
  //       return {
  //         text: `${context.playTimePipe.transform(item.profileActivity.stats.lastMonth)}`
  //       };
  //     }
  //   }
  // ],
  // [
  //   'lastNinety',
  //   {
  //     label: 'Last 90 Days',
  //     plainText: (item: ProfileRecentActivity, context: ViewContext) =>
  //       `${context.playTimePipe.transform(item.profileActivity.stats.lastNinetyDays)}`,
  //     render: (item: ProfileRecentActivity, context: ViewContext) => {
  //       return {
  //         text: `${context.playTimePipe.transform(item.profileActivity.stats..lastNinetyDays)}`
  //       };
  //     }
  //   }
  // ],
  [
    'dateLastPlayed',
    {
      label: 'Last Played',
      plainText: (item: ProfileRecentActivity, context: ViewContext) =>
        `${context.dateTimePipe.transform(item.profile?.profile.data.dateLastPlayed as unknown as Date)}`,
      render: (item: ProfileRecentActivity, context: ViewContext) => {
        return {
          text: `${context.dateTimePipe.transform(item.profile?.profile.data.dateLastPlayed as unknown as Date)}`
        };
      }
    }
  ]
]);
