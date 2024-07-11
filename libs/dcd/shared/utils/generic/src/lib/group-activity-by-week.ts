// import { MemberActivityRecentStatsActivity } from 'bungie-models';
// import { MemberActivityRecentStatsActivity } from '../models';
import { getBungieStartDate } from './date-utils';
import { groupActivities } from './group-activity-by-date';
// import { MemberActivityRecentStatsActivity } from './util.models';
import { MemberActivityRecentStatsActivity } from '@dcd/shared/models';

interface ActivitiesToGroupModel {
  period: Date | string | number;
  values: {
    activityDurationSeconds: {
      basic: {
        value: number;
      };
    };
  };
}

export function groupActivitiesByWeek(data: ActivitiesToGroupModel[]): Array<MemberActivityRecentStatsActivity> {
  const raw = data.map((x) => {
    return {
      date: getBungieStartDate(new Date(x.period)).toString(),
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
      date: getBungieStartDate(x.date as Date).toString(),
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
