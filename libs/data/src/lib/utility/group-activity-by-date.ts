import { formatDate } from './format-date';

export function groupActivities(raw) {
  // Todo: Find better way to handle this.
  let holder = {};

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

export function groupActivitiesByDate(data) {
  const raw = data.map((x) => {
    return { date: formatDate(x.period), seconds: x.values.activityDurationSeconds.basic.value };
  });

  return groupActivities(raw);
}

export function groupActivityStatsByDate(data) {
  return groupActivities(
    data.map((x) => {
      return { date: formatDate(x.date), seconds: x.seconds };
    })
  );
}
