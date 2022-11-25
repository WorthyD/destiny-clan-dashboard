import { formatDate } from './format-date';
import { ALL_SEASONS, MemberActivityRecentStatsActivity } from 'bungie-models';
import { getBungieStartDate, getFirstDayOfMonth } from './date-utils';
import { groupActivities } from './group-activity-by-date';

export function groupActivitiesBySeason(data): Array<MemberActivityRecentStatsActivity> {
  const raw = data.map((x) => {
    return {
      date: getFirstDayOfSeason(new Date(x.period)),
      seconds: x.values.activityDurationSeconds.basic.value
    };
  });
  return groupActivities(raw);
}

export function groupActivityStatsBySeason(data: MemberActivityRecentStatsActivity[]) {
  const raw = data.map((x) => {
    return {
      date: getFirstDayOfSeason(x.date),
      seconds: x.seconds
    };
  });
  return groupActivities(raw);
}

export function relabelSeasons(data: MemberActivityRecentStatsActivity[]) {
  return data
    .sort((a, b) => {
      return compare(a.date, b.date, true);
    })
    .map((x) => {
      return {
        seconds: x.seconds,
        date: lastWord(ALL_SEASONS.find((season) => new Date(x.date).getTime() === season.startDate.getTime())?.name)
      };
    });
}

function getFirstDayOfSeason(date) {
  let retDate;
  //for (let i = 0; i < ALL_SEASONS.length; i++) {
  for (let i = ALL_SEASONS.length - 1; i > -1; i--) {
    if (date < ALL_SEASONS[i].endDate && date > ALL_SEASONS[i].startDate) {
      retDate = ALL_SEASONS[i].startDate;

      break;
    }
  }
  // console.log(retDate)
  return retDate;
}
export function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function lastWord(words) {
  const n = words?.split(' ');
  if (n && n.length) {
    return n[n?.length - 1];
  }
  return '';
}
