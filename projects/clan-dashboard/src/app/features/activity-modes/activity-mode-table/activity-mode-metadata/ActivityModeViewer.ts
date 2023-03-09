import { ViewerMetadata } from '@destiny/components';
import { BungieDateTimePipe } from '@destiny/components/pipes';
import { PlaytimePipe } from '@destiny/components/pipes/playtime';
//import { ProfileRecentActivity } from '../../models/profile-recent-activity';
import { ProfileRecentActivity } from '../../models/ProfileActivityMode';
export interface ActivityModeViewContext {
  item: ProfileRecentActivity;
  playTimePipe: PlaytimePipe;
  dateTimePipe: BungieDateTimePipe;
}
export const ACTIVITY_MODE_VIEWER_METADATA = new Map<string, ViewerMetadata<ProfileRecentActivity, ActivityModeViewContext>>([
  [
    'playerName',
    {
      label: 'Display Name',
      isSticky: true,
      plainText: (item: ProfileRecentActivity) => `${item.member?.destinyUserInfo?.displayName}`,
      render: (item: ProfileRecentActivity) => {
        return {
          text: `${item.member?.destinyUserInfo?.displayName}`
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
  //         text: `${context.playTimePipe.transform(item.profileActivity.stats.lastNinetyDays)}`
  //       };
  //     }
  //   }
  // ],
  [
    'dateLastPlayed',
    {
      label: 'Last Played',
      plainText: (item: ProfileRecentActivity, context: ActivityModeViewContext) =>
        `${context.dateTimePipe.transform(item.profile?.profile.data.dateLastPlayed as unknown as Date)}`,
      render: (item: ProfileRecentActivity, context: ActivityModeViewContext) => {
        return {
          text: `${context.dateTimePipe.transform(item.profile?.profile.data.dateLastPlayed as unknown as Date)}`
        };
      }
    }
  ]
]);
