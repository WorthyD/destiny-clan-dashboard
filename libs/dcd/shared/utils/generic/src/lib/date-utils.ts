export function isValidDate(d: any) {
  return d instanceof Date && !isNaN(d.getTime());
}

export function nowPlusMinutes(minutes: number, now: Date = new Date()) {
  const nowMinutes = now.getMinutes();
  return new Date(now.setMinutes(nowMinutes + minutes));
}

export function nowPlusDays(days: number, now: Date = new Date()) {
  return new Date(now.setDate(now.getDate() + days));
}

export function nowPlusWeeks(weeks: number, now: Date = new Date()) {
  return new Date(now.setDate(now.getDate() + weeks * 7));
}

export function dateToUnixTimeStamp(d: Date) {
  return Math.floor(d.getTime() / 1000);
}

export function unixTimeStampToDate(uts: number) {
  return new Date(uts * 1000);
}

export function getBungieStartDate(date: Date): Date {
  const offset = date.getDay() >= 2 ? 2 : -5;
  // Clone date to prevent mutation
  const cDate = new Date(date.getTime());
  // Reset Time
  cDate.setHours(12, 0, 0);
  return new Date(cDate.setDate(date.getDate() - date.getDay() + offset));
}

export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getDateArray(startDate: Date, stopDate: Date) {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}
function addDays(date: Date, days: number) {
  date.setDate(date.getDate() + days);
  return date;
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export function getDayOfWeek(dayIndex: number) {
  return dayIndex < 7 ? daysOfWeek[dayIndex] : '';
}

export function playtime(input: number, showSeconds: boolean = true): string {
  let totalSeconds = input;
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  totalSeconds %= 3600;
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = showSeconds ? ':' + String(Math.floor(totalSeconds % 60)).padStart(2, '0') : '';

  return hours + ':' + minutes + seconds;
}
