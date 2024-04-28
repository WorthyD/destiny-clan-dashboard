import { ClanBungieInfoService } from './bungie-info.service';

import { ClanDatabase } from '../clan-database';
import { ClanDbObject } from '@dcd/shared/utils/legacy-db';

import { BungieInfo } from '../../models/BungieInfo';
import { ClanMember } from '../../models';
jest.mock('../clan-database');
const mockedDatabase = ClanDatabase as jest.Mock<ClanDatabase>;
const getMockClanObject: (id?: string, createDate?: Date, data?: BungieInfo) => Partial<ClanDbObject> = (
  id = '',
  createDate = new Date(),
  data = {}
) => {
  return {
    id,
    createDate,
    data: {
      displayName: 'test',
      ...data
    } as BungieInfo
  };
};

describe('ClanBungieInfoService', () => {
  let service: ClanBungieInfoService;
  const getFreshService = (clanDbPBase = new ClanDatabase()) => {
    return new ClanBungieInfoService(clanDbPBase, '');
  };

  it('should be created', () => {
    service = getFreshService();
    expect(service).toBeTruthy();
  });

  describe('getBungieInfo', () => {
    afterEach(() => {
      mockedDatabase.mockClear();
    });
    it('should return from cache if not stale', (done) => {
      const userId = '1-1';
      const testName = 'should return from cache if not stale';
      const getFnPromise = jest
        .fn()
        .mockResolvedValue(getMockClanObject(userId, new Date(), { displayName: testName }));

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise
        } as unknown as ClanDatabase;
      });
      1;
      const fetchSpyFn = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.reject('')
        })
      ) as jest.Mock;

      global.fetch = fetchSpyFn;

      service = getFreshService(new mockedDatabase());

      service
        .getBungieInfo('', { destinyUserInfo: { membershipId: '1', membershipType: '1' } } as unknown as ClanMember)
        .subscribe((x) => {
          expect(x.displayName).toEqual(testName);
          expect(fetchSpyFn).toHaveBeenCalledTimes(0);
          expect(getFnPromise).toHaveBeenCalledTimes(1);
          done();
        });
    });
    it('should call api if stale', (done) => {
      const userId = '1-1';
      const testAPIName = 'API Name';
      const testDBName = 'Database Name';
      const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 60));
      const getFnPromise = jest
        .fn()
        .mockResolvedValue(getMockClanObject(userId, twoDaysAgo, { displayName: testDBName }));
      const updateFn = jest.fn();

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      const fetchSpyFn = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              Response: { displayName: testAPIName }
            })
        })
      ) as jest.Mock;

      global.fetch = fetchSpyFn;

      service = getFreshService(new mockedDatabase());

      service
        .getBungieInfo('', {
          destinyUserInfo: { membershipId: '1', membershipType: '1' },
          bungieNetUserInfo: { membershipId: '1', membershipType: '1' }
        } as unknown as ClanMember)
        .subscribe((x) => {
          expect(x.displayName).toEqual(testAPIName);
          expect(fetchSpyFn).toHaveBeenCalledTimes(1);
          expect(getFnPromise).toHaveBeenCalledTimes(1);
          expect(updateFn).toHaveBeenCalledTimes(1);
          done();
        });
    });
    it('should call api if players has played since last update', (done) => {
      const userId = '1-1';
      const testAPIName = 'API Name';
      const testDBName = 'Database Name';

      const lastHour = new Date(new Date().setMinutes(new Date().getMinutes() - 60));
      const lastHalfHourUnix =
        Math.floor(new Date(new Date().setMinutes(new Date().getMinutes() - 30)).getTime()) / 1000;

      const getFnPromise = jest
        .fn()
        .mockResolvedValue(getMockClanObject(userId, lastHour, { displayName: testDBName }));
      const updateFn = jest.fn();

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      const fetchSpyFn = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ Response: { displayName: testAPIName } })
        })
      ) as jest.Mock;

      global.fetch = fetchSpyFn;

      service = getFreshService(new mockedDatabase());

      service
        .getBungieInfo('', {
          destinyUserInfo: { membershipId: '1', membershipType: '1' },
          bungieNetUserInfo: { membershipId: '1', membershipType: '1' },
          lastOnlineStatusChange: lastHalfHourUnix
        } as unknown as ClanMember)
        .subscribe((x) => {
          expect(x.displayName).toEqual(testAPIName);
          expect(fetchSpyFn).toHaveBeenCalledTimes(1);
          expect(getFnPromise).toHaveBeenCalledTimes(1);
          expect(updateFn).toHaveBeenCalledTimes(1);
          done();
        });
    });
    it('should call api if not present', (done) => {
      const testAPIName = 'API Name';

      const getFnPromise = jest.fn().mockResolvedValue(undefined);
      const updateFn = jest.fn();

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      const fetchSpyFn = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ Response: { displayName: testAPIName } })
        })
      ) as jest.Mock;

      global.fetch = fetchSpyFn;

      service = getFreshService(new mockedDatabase());

      service
        .getBungieInfo('', {
          destinyUserInfo: { membershipId: '1', membershipType: '1' },
          bungieNetUserInfo: { membershipId: '1', membershipType: '1' }
        } as unknown as ClanMember)
        .subscribe((x) => {
          expect(x.displayName).toEqual(testAPIName);
          expect(fetchSpyFn).toHaveBeenCalledTimes(1);
          expect(getFnPromise).toHaveBeenCalledTimes(1);
          expect(updateFn).toHaveBeenCalledTimes(1);
          done();
        });
    });
    it('should return cache data if api errors', (done) => {
      const userId = '1-1';
      const testDBName = 'Database Name';

      const lastHour = new Date(new Date().setMinutes(new Date().getMinutes() - 60));
      const lastHalfHourUnix =
        Math.floor(new Date(new Date().setMinutes(new Date().getMinutes() - 30)).getTime()) / 1000;

      const getFnPromise = jest
        .fn()
        .mockResolvedValue(getMockClanObject(userId, lastHour, { displayName: testDBName }));
      const updateFn = jest.fn();

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      const fetchSpyFn = jest.fn(() => Promise.reject('')) as jest.Mock;

      global.fetch = fetchSpyFn;

      service = getFreshService(new mockedDatabase());

      service
        .getBungieInfo('', {
          destinyUserInfo: { membershipId: '1', membershipType: '1' },
          bungieNetUserInfo: { membershipId: '1', membershipType: '1' },
          lastOnlineStatusChange: lastHalfHourUnix
        } as unknown as ClanMember)
        .subscribe((x) => {
          expect(x.displayName).toEqual(testDBName);
          expect(fetchSpyFn).toHaveBeenCalledTimes(1);
          expect(getFnPromise).toHaveBeenCalledTimes(1);
          expect(updateFn).toHaveBeenCalledTimes(0);
          done();
        });
    });
    it('should catch error if Account not found', (done) => {
      const lastHalfHourUnix =
        Math.floor(new Date(new Date().setMinutes(new Date().getMinutes() - 30)).getTime()) / 1000;

      const getFnPromise = jest.fn().mockResolvedValue(null);
      const updateFn = jest.fn();

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      const fetchSpyFn = jest.fn(() => Promise.reject({ ErrorStatus: 'DestinyAccountNotFound' })) as jest.Mock;

      global.fetch = fetchSpyFn;

      service = getFreshService(new mockedDatabase());

      service
        .getBungieInfo('', {
          destinyUserInfo: { membershipId: '1', membershipType: '1' },
          bungieNetUserInfo: { membershipId: '1', membershipType: '1' },
          lastOnlineStatusChange: lastHalfHourUnix
        } as unknown as ClanMember)
        .subscribe({
          next: (x) => {
            throw new Error('should catch error if Account not found failed');
          },
          complete: () => {
            expect(fetchSpyFn).toHaveBeenCalledTimes(1);
            expect(getFnPromise).toHaveBeenCalledTimes(1);
            expect(updateFn).toHaveBeenCalledTimes(0);
            done();
          }
        });
    });
    it('should throw proper error', (done) => {
      const lastHalfHourUnix =
        Math.floor(new Date(new Date().setMinutes(new Date().getMinutes() - 30)).getTime()) / 1000;

      const getFnPromise = jest.fn().mockResolvedValue(null);
      const updateFn = jest.fn();

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      const fetchSpyFn = jest.fn(() => Promise.reject(new Error('Error'))) as jest.Mock;

      global.fetch = fetchSpyFn;

      service = getFreshService(new mockedDatabase());
      let error;

      service
        .getBungieInfo('', {
          destinyUserInfo: { membershipId: '1', membershipType: '1' },
          bungieNetUserInfo: { membershipId: '1', membershipType: '1' },
          lastOnlineStatusChange: lastHalfHourUnix
        } as unknown as ClanMember)
        .subscribe({
          next: (x) => {
            throw new Error('should catch error if Account not found failed');
          },
          error: (err) => {
            error = err;
            expect(error).toBeDefined();
            expect(fetchSpyFn).toHaveBeenCalledTimes(1);
            expect(getFnPromise).toHaveBeenCalledTimes(1);
            expect(updateFn).toHaveBeenCalledTimes(0);

            done();
          }
        });
    });
  });

  describe('getSerializedBungieInfosWithProgress', () => {
    it('should return data and report progress', (done) => {
      jest.useFakeTimers();

      const userId = '1-1';
      const testDBName = 'Database Name';
      const getFnPromise = jest
        .fn()
        .mockResolvedValue(getMockClanObject(userId, new Date(), { displayName: testDBName }));

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise
        } as unknown as ClanDatabase;
      });

      service = getFreshService(new mockedDatabase());
      const memberCount = 100;
      const testIndexes = Array.from(Array(memberCount).keys());
      const clanMembers: ClanMember[] = testIndexes.map((x) => {
        return {
          destinyUserInfo: {
            membershipType: 1,
            membershipId: x
          }
        };
      });
      const progressFn = jest.fn();

      service.getSerializedBungieInfosWithProgress('1', clanMembers, progressFn).subscribe((x) => {
        expect(x.length).toEqual(memberCount);
        expect(progressFn).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getSerializedBungieInfosFromCache', () => {
    it('should return data', (done) => {
      const userId = '1-1';
      const testDBName = 'Database Name';
      const getFnPromise = jest
        .fn()
        .mockResolvedValue(getMockClanObject(userId, new Date(), { displayName: testDBName }));

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise
        } as unknown as ClanDatabase;
      });

      service = getFreshService(new mockedDatabase());
      const memberCount = 100;
      const testIndexes = Array.from(Array(memberCount).keys());
      const clanMembers: ClanMember[] = testIndexes.map((x) => {
        return {
          destinyUserInfo: {
            membershipType: 1,
            membershipId: x
          }
        };
      });

      service.getSerializedBungieInfosFromCache('1', clanMembers).subscribe((x) => {
        expect(x.length).toEqual(memberCount);
        done();
      });
    });
  });
});
