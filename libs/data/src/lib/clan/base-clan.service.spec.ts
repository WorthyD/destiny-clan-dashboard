import { BaseClanService } from './base-clan.service';
import { ClanDatabase } from './clan-database';
import { DBObject, StoreId } from '../db/clan-indexed-db';

describe('Base Clan Service', () => {
  const mockClanDB = new ClanDatabase();

  function getDate(minutes) {
    return new Date(new Date().setMinutes(new Date().getMinutes() + minutes));
  }
  describe('getDataFromCache', () => {
    let service: BaseClanService;
    beforeEach(() => {
      service = new BaseClanService(mockClanDB, StoreId.MemberRecentActivities);
      service.updateDB('test', 'test', {});
    });

    it('should return all data', (done) => {
      service = new BaseClanService(mockClanDB, StoreId.MemberRecentActivities);
      service.updateDB('test', 'test', {});
      const d = service.getDataFromCache('test', 'test');
      d.then((result) => {
        console.log('all the things', result);
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('getAllDataFromCache', () => {
    let service: BaseClanService;
    beforeEach(() => {
      service = new BaseClanService(mockClanDB, StoreId.MemberRecentActivities);
      service.updateDB('test', 'test', {});
    });

    it('should return all data', (done) => {
      const d = service.getAllDataFromCache('test');
      d.then((result) => {
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('isCacheValid', () => {
    let service;
    beforeEach(() => {
      service = new BaseClanService(mockClanDB, StoreId.MemberRecentActivities);
    });

    it('Should return false if nothing is passed in', () => {
      const db: DBObject = {
        id: '',
        createDate: new Date(),
        data: []
      };

      const val = service.isCacheValid(null, 100, new Date());
      expect(val).toBe(false);
    });

    it('Should return true if cache is new than last played', () => {
      const db: DBObject = {
        id: '',
        createDate: new Date(),
        data: []
      };
      const lastActivityDate = getDate(-10);

      const val = service.isCacheValid(db, 0, lastActivityDate);
      expect(val).toBe(true);
    });

    it('Should return false if cache is older than last played', () => {
      const db: DBObject = {
        id: '',
        createDate: getDate(-10),
        data: []
      };
      const lastActivityDate = new Date();

      const val = service.isCacheValid(db, 0, lastActivityDate);
      expect(val).toBe(false);
    });
    it('Should return true if cache is new than last played and threshold not met', () => {
      const db: DBObject = {
        id: '',
        createDate: getDate(-70),
        data: []
      };
      const lastActivityDate = getDate(-10);

      // Cache Create -70
      // Last active -10
      // XP minutes 700

      const val = service.isCacheValid(db, 700, lastActivityDate);
      expect(val).toBe(true);
    });

    it('Should return true if cache is older than threshold and still has not played', () => {
      const db: DBObject = {
        id: '',
        createDate: getDate(-700),
        data: []
      };
      const lastActivityDate = getDate(-1000);

      // Cache Create -70
      // Last active -10
      // XP minutes 700

      const val = service.isCacheValid(db, 70, lastActivityDate);
      expect(val).toBe(true);
    });

    it('Should return false if cache is older than last played and threshold met', () => {
      const db: DBObject = {
        id: '',
        createDate: getDate(-70),
        data: []
      };
      const lastActivityDate = getDate(-50);

      // Cache Create -700
      // Last active -10
      // XP minutes 700

      const val = service.isCacheValid(db, 40, lastActivityDate);
      expect(val).toBe(false);
    });

    it('Should return true if cache is new than last played and threshold not met no activity date', () => {
      const db: DBObject = {
        id: '',
        createDate: getDate(-20),
        data: []
      };
      const val = service.isCacheValid(db, 40);
      expect(val).toBe(true);
    });
    it('Should return false if cache is older than last played and threshold met no activity date', () => {
      const db: DBObject = {
        id: '',
        createDate: getDate(-200),
        data: []
      };
      const val = service.isCacheValid(db, 40);
      expect(val).toBe(false);
    });
  });
});
