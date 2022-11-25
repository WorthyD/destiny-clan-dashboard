// import { MemberActivityRecentStatsActivity } from 'bungie-models';
import { MemberActivityRecentStatsActivity } from 'projects/bungie-models/src/lib/models/MemberActivityRecentStats';
import { getBungieStartDate } from './date-utils';
import { groupActivities } from './group-activity-by-date';

export function groupActivitiesByWeek(data): Array<MemberActivityRecentStatsActivity> {
  const raw = data.map((x) => {
    return {
      date: getBungieStartDate(new Date(x.period)),
      seconds: x.values.activityDurationSeconds.basic.value
    };
  });
  return groupActivities(raw);
}

export function groupActivityStatsByWeek(data: MemberActivityRecentStatsActivity[]) {
  // const raw = data.map((x) => {
  //   return Object.assign(
  //     {},
  //     {
  //       date: getBungieStartDate(x.date),
  //       seconds: x.seconds
  //     }
  //   );
  // });
  // return groupActivities(raw);

  const raw = data.map((x) => {
    return {
      date: getBungieStartDate(x.date),
      seconds: x.seconds
    };
  });
  return groupActivities(raw);
}

// function findtBungieStartDate(date) {
//   return formatDate(getBungieStartDate(date));
// }

// function groupByWeek(raw: MemberActivityRecentStatsActivity[]) {
//   const obj2 = raw.reduce((prev, cur) => {
//     const index = prev.findIndex((x) => x.date === cur.date);
//     // console.log(prev);
//     // console.log(cur.date );
//     // console.log('--------------')
//     if (index > -1) {
//       prev[index].seconds += cur.seconds;
//     } else {
//       prev.push({ date: cur.date, seconds: cur.seconds });
//     }

//     return prev;
//   }, []);

//   return obj2;
// }
