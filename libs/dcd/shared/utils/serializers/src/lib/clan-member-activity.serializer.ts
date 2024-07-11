// @ts-nocheck

// import { DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from 'bungie-api-angular';

import { DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from '@dcd/shared/models';
// import { DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from 'bungie-api-angular/lib/model/destinyHistoricalStatsDestinyHistoricalStatsPeriodGroup';

export function clanMemberActivitySerializer(
  activity: DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup
): DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup {
  return {
    period: activity.period,
    activityDetails: {
      mode: activity.activityDetails.mode,
      modes: activity.activityDetails.modes,
      directorActivityHash: activity.activityDetails.directorActivityHash
    },
    values: {
      activityDurationSeconds: activity?.values['activityDurationSeconds'],
      completed: activity?.values['completed']
    }
  };
}
