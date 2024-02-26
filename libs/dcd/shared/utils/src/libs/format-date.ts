export function formatDate(date: Date | string | number) {
  const d = new Date(date);
  let month = '' + (d.getUTCMonth() + 1),
    day = '' + d.getUTCDate();
  const year = d.getUTCFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}
