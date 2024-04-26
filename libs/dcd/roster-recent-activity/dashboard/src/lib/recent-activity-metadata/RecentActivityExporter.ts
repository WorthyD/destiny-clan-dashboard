import { MembershipTypes } from '@destiny-clan-dashboard/data/models/enums';
import { ProfileRecentActivity } from '@dcd/roster-recent-activity/models';
import { PlaytimePipe } from '@dcd/shared/utils/pipes';
import { BungieDateTimePipe } from '@dcd/shared/utils/pipes';
import { ExporterMetadata } from '@destiny-clan-dashboard/shared/data';

interface ViewContext {
  item: ProfileRecentActivity;
  playTimePipe: PlaytimePipe;
  dateTimePipe: BungieDateTimePipe;
}
// import { MockListItem } from './ListItems';
export const CLAN_ROSTER_EXPORTER_METADATA = new Map<string, ExporterMetadata<ProfileRecentActivity, ViewContext>>([
  [
    'playerName',
    {
      label: 'Display Name',
      text: (item: ProfileRecentActivity) => `${item.clanMember?.destinyUserInfo?.displayName}`
    }
  ],
  [
    'clanName',
    {
      label: 'Clan Name',
      text: (item: ProfileRecentActivity) => `${item.clan.clanName}`
    }
  ],
  // [
  //   'lastWeek',
  //   {
  //     label: 'Last Week (Minutes)',
  //     text: (item: ProfileRecentActivity) => `${convertToMinutes(item.profileActivity?.stats?.lastWeek)}`
  //   }
  // ],
  // [
  //   'lastMonth',
  //   {
  //     label: 'Last Month (Minutes)',
  //     text: (item: ProfileRecentActivity) => `${convertToMinutes(item.profileActivity?.stats?.lastMonth)}`
  //   }
  // ],
  // [
  //   'lastNinety',
  //   {
  //     label: 'Last 90 Days (Minutes)',
  //     text: (item: ProfileRecentActivity) => `${convertToMinutes(item.profileActivity?.stats?.lastNinetyDays)}`
  //   }
  // ],
  [
    'dateLastPlayed',
    {
      label: 'Last Played',
      text: (item: ProfileRecentActivity, context: ViewContext) =>
        `${context.dateTimePipe.transform(item.profile?.profile?.data?.dateLastPlayed as unknown as Date)}`
    }
  ]
]);

const convertToMinutes = (totalSeconds) => String(Math.floor(totalSeconds / 60));
