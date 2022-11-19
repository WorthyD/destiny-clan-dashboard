import { formatDate } from './format-date';
import { MemberActivityRecentStatsActivity } from 'bungie-models';
import { getBungieStartDate,getFirstDayOfMonth } from './date-utils';
import { groupActivities } from './group-activity-by-date';

export function groupActivitiesByMonth(data): Array<MemberActivityRecentStatsActivity> {
  const raw = data.map((x) => {
    return {
      date: getFirstDayOfMonth(new Date(x.period)),
      seconds: x.values.activityDurationSeconds.basic.value
    };
  });
  return groupActivities(raw);
}

export function groupActivityStatsByMonth(data: MemberActivityRecentStatsActivity[]) {
  const raw = data.map((x) => {
    return {
      date: getFirstDayOfMonth(x.date),
      seconds: x.seconds
    };
  });
  return groupActivities(raw);
}

