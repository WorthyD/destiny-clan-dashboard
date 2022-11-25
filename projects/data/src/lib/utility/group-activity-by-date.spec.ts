import { getBungieStartDate, nowPlusDays } from './date-utils';
import { groupActivitiesByDate, groupActivityStatsByDate } from './group-activity-by-date';
const _MOCK_DATA = [
  {
    period: '2020-08-27T01:38:09Z',
    activityDetails: {},
    values: {
      activityDurationSeconds: {
        statId: 'activityDurationSeconds',
        basic: {
          value: 400
        }
      }
    }
  },
  {
    period: '2020-08-27T01:27:28Z',
    activityDetails: {},
    values: {
      activityDurationSeconds: {
        statId: 'activityDurationSeconds',
        basic: {
          value: 300
        }
      }
    }
  },
  {
    period: '2020-08-30T01:27:28Z',
    activityDetails: {},
    values: {
      activityDurationSeconds: {
        statId: 'activityDurationSeconds',
        basic: {
          value: 300
        }
      }
    }
  }
];

function datePlusDays(date: Date, days: number) {
  return new Date(new Date().setDate(date.getDate() + days));
}
const yesterday = nowPlusDays(-1);
const yesterday2 = new Date(nowPlusDays(-1).setHours(12));
const yesterday3 = nowPlusDays(-2);
const yesterday4 = new Date(nowPlusDays(-2).setHours(12));
const yesterday5 = nowPlusDays(-3);

const dates = [yesterday, yesterday2, yesterday3, yesterday4, yesterday5];

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

describe('Group activities by date', () => {
  it('groupActivitiesByDate', () => {
    const orig = JSON.stringify(bActivities);
    const formatted = groupActivitiesByDate(bActivities);
    expect(formatted[0].seconds).toEqual(100);
    expect(formatted[1].seconds).toEqual(200);
    expect(formatted[2].seconds).toEqual(200);

    expect(formatted.length).toEqual(3);
    expect(JSON.stringify(bActivities)).toEqual(orig);
    // expect(formatted.find((x) => x.date === '2020-08-26').seconds).toEqual(700);
  });

  it('groupActivityStatsByDate', () => {
    const orig = JSON.stringify(groupedActivities);
    const formatted = groupActivityStatsByDate(groupedActivities);
    expect(formatted[0].seconds).toEqual(100);
    expect(formatted[1].seconds).toEqual(200);
    expect(formatted[2].seconds).toEqual(200);

    expect(formatted.length).toEqual(3);

    expect(JSON.stringify(groupedActivities)).toEqual(orig);
  });
});
