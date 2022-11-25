import { getBungieStartDate, nowPlusDays } from './date-utils';
import { groupActivitiesByMonth, groupActivityStatsByMonth } from './group-activity-by-month';

function datePlusDays(date: Date, days: number) {
  return new Date(new Date().setDate(date.getDate() + days));
}
const yesterday = getBungieStartDate(nowPlusDays(-1));
const lastWeek = datePlusDays(new Date(yesterday), -4);
const twoWeeks = datePlusDays(new Date(yesterday), -39);
const twoWeeks2 = datePlusDays(new Date(yesterday), -40);
const threeWeeks = datePlusDays(new Date(yesterday), -60);
const dates = [lastWeek, twoWeeks, twoWeeks2, threeWeeks];

const bActivities = [...dates].map((x) => {
  return {
    period: x,
    activityDetails: {},
    values: {
      activityDurationSeconds: {
        basic: {
          value: 100
        }
      }
    }
  };
});

const groupedActivities = [...dates].map((x) => {
  return {
    date: x,
    seconds: 100
  };
});

describe('Group activities by month', () => {
  it('groupActivitiesByWeek', () => {
    const orig = JSON.stringify(bActivities);
    const formatted = groupActivitiesByMonth(bActivities);

    expect(formatted.length).toEqual(3);
    expect(formatted[0].seconds).toEqual(100);
    expect(formatted[1].seconds).toEqual(200);
    expect(formatted[2].seconds).toEqual(100);
    // Make sure it doesn't mutate original object
    expect(JSON.stringify(bActivities)).toEqual(orig);
  });

  it('groupActivityStatsByWeek', () => {
    const orig = JSON.stringify(groupedActivities);

    const formatted = groupActivityStatsByMonth(groupedActivities);

    expect(formatted.length).toEqual(3);
    expect(formatted[0].seconds).toEqual(100);
    expect(formatted[1].seconds).toEqual(200);
    expect(formatted[2].seconds).toEqual(100);
    // Make sure it doesn't mutate original object
    expect(JSON.stringify(groupedActivities)).toEqual(orig);
  });
});
