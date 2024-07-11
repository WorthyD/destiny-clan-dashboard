import {
  isValidDate,
  dateToUnixTimeStamp,
  unixTimeStampToDate,
  getBungieStartDate,
  nowPlusMinutes,
  nowPlusDays,
  nowPlusWeeks,
  getFirstDayOfMonth,
  getDateArray,
  getDayOfWeek,
  playtime
} from './date-utils';

describe('Date Utils', () => {
  describe('isValidDate', () => {
    it('should work with dates', () => {
      const d = new Date();
      expect(isValidDate(d)).toEqual(true);
    });
    it('should not work with numbers', () => {
      const d = 123232323;
      expect(isValidDate(d)).toEqual(false);
    });
    it('should not work with strings', () => {
      const d = 123232323;
      expect(isValidDate(d)).toEqual(false);
    });
    it('should not work with objects', () => {
      const d = {};
      expect(isValidDate(d)).toEqual(false);
    });
    it('should not work with nulls', () => {
      const d = null;
      expect(isValidDate(d)).toEqual(false);
    });
    it('should not work with undefined', () => {
      const d = undefined;
      expect(isValidDate(d)).toEqual(false);
    });
  });

  describe('nowPlusMinutes', () => {
    it('should add minutes', () => {
      const d = new Date('1/1/1900 12:00');
      const e = new Date('1/1/1900 12:01');
      expect(nowPlusMinutes(1, d)).toEqual(e);
    });
  });
  describe('nowPlusDays', () => {
    it('should add days', () => {
      const d = new Date('1/1/1900');
      const e = new Date('1/2/1900');
      expect(nowPlusDays(1, d)).toEqual(e);
    });
  });

  describe('nowPlusWeeks', () => {
    it('should add days', () => {
      const d = new Date('1/1/1900');
      const e = new Date('1/8/1900');
      expect(nowPlusWeeks(1, d)).toEqual(e);
    });
  });

  describe('dateToUnixTimeStamp', () => {
    it('should convert date to unix timestamp', () => {
      const d = new Date('2000-01-01T00:00:00+00:00');
      expect(dateToUnixTimeStamp(d)).toEqual(946684800);
    });
  });
  describe('unixTimeStampToDate', () => {
    it('should convert unix timestamp to date', () => {
      const uxts = 946684800;
      const d = new Date('2000-01-01T00:00:00+00:00');
      expect(unixTimeStampToDate(uxts)).toEqual(d);
    });
  });

  describe('getBungieStartDate', () => {
    it('found find bungie start date', () => {
      const date = new Date(2021, 1, 18);
      const oDate = new Date(2021, 1, 18);
      const bungieStartDate = getBungieStartDate(date);
      expect(bungieStartDate.getDate()).toBe(16);
      expect(date).toEqual(oDate);
    });
  });

  describe('getFirstDayOfMonth', () => {
    it('get first day of the month', () => {
      const date = new Date(2024, 5, 15);
      const firstDate = new Date(2024, 5, 1);
      expect(getFirstDayOfMonth(date)).toEqual(firstDate);
    });
  });

  describe('getDateArray', () => {
    it('should return an array of dates', () => {
      const startDate = new Date(2024, 5, 1);
      const endDate = new Date(2024, 5, 7);
      const expectedArray = [
        new Date(2024, 5, 1),
        new Date(2024, 5, 2),
        new Date(2024, 5, 3),
        new Date(2024, 5, 4),
        new Date(2024, 5, 5),
        new Date(2024, 5, 6),
        new Date(2024, 5, 7)
      ];
      expect(getDateArray(startDate, endDate)).toEqual(expectedArray);
    });
  });

  describe('getDayOfWeek', () => {
    it('should return the proper day', () => {
      expect(getDayOfWeek(2)).toEqual('Tuesday');
    });
    it('should return empty with invalid value', () => {
      expect(getDayOfWeek(8)).toEqual('');
    });
  });

  describe('playtime', () => {
    it('should display play time seconds', () => {
      expect(playtime(86400)).toBe('24:00:00');
      expect(playtime(3600)).toBe('01:00:00');
      expect(playtime(60)).toBe('00:01:00');
    });
    it('should display play time seconds w/0', () => {
      expect(playtime(86400, false)).toBe('24:00');
      expect(playtime(3600, false)).toBe('01:00');
      expect(playtime(60, false)).toBe('00:01');
    });
  });
});
