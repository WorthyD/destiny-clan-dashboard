import { ViewerMetadata } from '@destiny/components';
import { BungieDateTimePipe } from '@destiny/components/pipes';
import { PlaytimePipe } from '@destiny/components/pipes/playtime';
import { ProfileRecentActivity } from '../models/profile-recent-activity';

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
      render: (item: ProfileRecentActivity) => {
        return {
          text: `${item.profile.profile.data.userInfo.displayName}`
        };
      }
    }
  ],
  [
    'clanName',
    {
      label: 'Clan Name',
      render: (item: ProfileRecentActivity) => {
        return {
          text: `${item.clan.clanName}`
        };
      }
    }
  ],
  [
    'lastWeek',
    {
      label: 'Last Week',
      render: (item: ProfileRecentActivity, context: ViewContext) => {
        return {
          text: `${context.playTimePipe.transform(item.profileActivity.stats.lastWeek)}`
        };
      }
    }
  ],
  [
    'lastMonth',
    {
      label: 'Last Month',
      render: (item: ProfileRecentActivity, context: ViewContext) => {
        return {
          text: `${context.playTimePipe.transform(item.profileActivity.stats.lastMonth)}`
        };
      }
    }
  ],
  [
    'lastNinety',
    {
      label: 'Last 90 Days',
      render: (item: ProfileRecentActivity, context: ViewContext) => {
        return {
          text: `${context.playTimePipe.transform(item.profileActivity.stats.lastNinetyDays)}`
        };
      }
    }
  ],
  [
    'dateLastPlayed',
    {
      label: 'Last Played',
      render: (item: ProfileRecentActivity, context: ViewContext) => {
        return {
          text: `${context.dateTimePipe.transform(item.profile?.profile.data.dateLastPlayed as unknown as Date)}`
        };
      }
    }
  ]
]);
