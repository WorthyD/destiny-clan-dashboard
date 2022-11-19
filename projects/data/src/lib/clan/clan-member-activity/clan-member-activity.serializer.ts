// import { DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from 'bungie-api-angular';

import { DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from '../../models/DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup';

// import { DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from 'bungie-api-angular/lib/model/destinyHistoricalStatsDestinyHistoricalStatsPeriodGroup';

export function clanMemberActivitySerializer(
  activity: DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup
): DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup {
  return {
    period: activity.period,
    activityDetails: {
      mode: activity.activityDetails.mode,
      modes: activity.activityDetails.modes
    },
    values: {
      activityDurationSeconds: activity?.values['activityDurationSeconds'],
      completed: activity?.values['completed']
    }
  };
}
