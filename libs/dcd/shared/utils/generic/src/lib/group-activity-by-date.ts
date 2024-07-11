import { formatDate } from './format-date';
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

export function groupActivities(raw: { date: string; seconds: number }[]) {
  // Todo: Find more performant way to do this
  let holder: { [key: string]: number } = {};

  raw.forEach(function (d) {
    if (holder.hasOwnProperty(d.date)) {
      holder[d.date] = holder[d.date] + d.seconds;
    } else {
      holder[d.date] = d.seconds;
    }
  });

  const obj2 = [];

  for (let prop in holder) {
    obj2.push({ date: new Date(prop), seconds: holder[prop] });
  }

  return obj2;
}

export function groupActivitiesByDate(data: ActivitiesToGroupModel[]) {
  const raw = data.map((x) => {
    return { date: formatDate(x.period), seconds: x.values.activityDurationSeconds.basic.value };
  });

  return groupActivities(raw);
}

export function groupActivityStatsByDate(data: { date: string | Date; seconds: number }[]) {
  return groupActivities(
    data.map((x) => {
      return { date: formatDate(x.date), seconds: x.seconds };
    })
  );
}
