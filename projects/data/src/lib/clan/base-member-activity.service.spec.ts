import { catchError, of, take } from 'rxjs';
import { DBObject, StoreId } from '../db/clan-indexed-db';
import { BaseMemberActivityService } from './base-member-activity.service';
import { ClanDatabase } from './clan-database';

const mockProfile = {
  profile: {
    data: {
      userInfo: {
        membershipType: 3,
        membershipId: 1
      }
    }
  }
};
const mockActivityObj: Partial<DBObject> = {
  id: '3-1-1',
  createDate: new Date('2023-01-12T16:38:58.689Z'),
  data: [
    {
      period: '2022-11-09T18:30:33Z',
      activityDetails: {
        mode: 82,
        modes: [7, 82]
      },
      values: {
        activityDurationSeconds: {
          statId: 'activityDurationSeconds',
          basic: {
            value: 868,
            displayValue: '14m 28s'
          }
        },
        completed: {
          statId: 'completed',
          basic: {
            value: 0,
            displayValue: 'No'
          }
        }
      }
    }
  ]
};
describe('Base Member Activity Service', () => {
  let activityService: BaseMemberActivityService;
  //let clanDbPBase: ClanDatabase;
  const fetchSpy = jest.fn();

  const getFreshService = (clanDbPBase = new ClanDatabase()) => {
    return new BaseMemberActivityService(clanDbPBase, StoreId.MemberActivities, 'apiKey', new Date(), 10, 0, fetchSpy);
  };

  it('should instantiate', () => {
    activityService = getFreshService();
  });

  describe('getMemberCharacterActivityFromAPI', () => {
    beforeEach(() => {
      fetchSpy.calls.reset();
    });

    it('should work', (done) => {
      fetchSpy.mockReturnValue(
        new Promise((res, rej) => {
          res({
            json: () =>
              new Promise((res2, rej2) => {
                res2('res2');
              })
          });
        })
      );
      activityService = getFreshService();
      activityService
        .getMemberCharacterActivityFromAPI(mockProfile, 1, 0)
        .pipe(take(1))
        .subscribe((x) => {
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          done();
        });
    });
    it('should error', (done) => {
      fetchSpy.mockReturnValue(
        new Promise((res, rej) => {
          res({
            json: () =>
              new Promise((res2, rej2) => {
                rej2('res2');
              })
          });
        })
      );
      activityService = getFreshService();
      activityService
        .getMemberCharacterActivityFromAPI(mockProfile, 1, 0)
        .pipe(
          take(1),
          catchError((err) => {
            expect(err).not.toBeUndefined();
            return of(null);
          })
        )
        .subscribe((x) => {
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          expect(x).toBeNull();
          done();
        });
    });
  });

  describe('getMemberCharacterActivity', () => {
    beforeEach(() => {
      fetchSpy.calls.reset();
    });
    it('should work without cache', (done) => {
      const dbSpy = {
        'getAll': jest.fn(),
        'getById': jest.fn()
      } as jasmine.SpyObj<ClanDatabase>;
      dbSpy.getById.mockReturnValue(
        new Promise((res, rej) => {
          res(mockActivityObj as unknown as DBObject);
        })
      );
      activityService = getFreshService(dbSpy);
      const cacheSpy = jest.spyOn(activityService, 'verifyCacheIntegrity');
      activityService
        .getMemberCharacterActivity(1, mockProfile, 1, false)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.length).toBe(1);
          expect(cacheSpy).toHaveBeenCalledTimes(0);
          done();
        });
    });
    //! TODO Fix eventually
    /*
    it('should work with cache', (done) => {
      const dbSpy = jasmine.createSpyObj('ClanDatabase', ['getAll', 'getById']) as jasmine.SpyObj<ClanDatabase>;
      dbSpy.getById.and.returnValue(
        new Promise((res, rej) => {
          res(mockActivityObj as unknown as DBObject);
        })
      );
      activityService = getFreshService(dbSpy);
      const cacheSpy = spyOn(activityService, 'verifyCacheIntegrity');
      activityService
        .getMemberCharacterActivity(1, mockProfile, 1, true)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.length).toBe(1);
          expect(cacheSpy).toHaveBeenCalledTimes(1);
          done();
        });
    });
    */
  });
  describe('verifyCacheIntegrity', () => {
    it('should work with valid data', (done) => {
      const dbSpy = {
        'getAll': jest.fn(),
        'getById': jest.fn()
      } as jasmine.SpyObj<ClanDatabase>;
      activityService = getFreshService(dbSpy);

      const clanId = 1;
      const memberProfile = mockProfile;
      const characterId = 1;
      const cachedData: Partial<DBObject> = { ...mockActivityObj, createDate: new Date() };

      const cacheSpy = jest.spyOn(activityService, 'getFreshMemberCharacterActivity');
      activityService
        .verifyCacheIntegrity(clanId, memberProfile, characterId, cachedData as DBObject)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.length).toEqual(1);
          expect(cacheSpy).toHaveBeenCalledTimes(0);
          done();
        });
    });
    it('should call for fresh data with old data', (done) => {
      const dbSpy = {
        'getAll': jest.fn(),
        'getById': jest.fn()
      } as jasmine.SpyObj<ClanDatabase>;
      activityService = getFreshService(dbSpy);

      const clanId = 1;
      const memberProfile = mockProfile;
      const characterId = 1;
      const cachedData: Partial<DBObject> = { ...mockActivityObj, createDate: new Date('1/1/1900') };

      const cacheSpy = jest.spyOn(activityService, 'getFreshMemberCharacterActivity');
      activityService
        .verifyCacheIntegrity(clanId, memberProfile, characterId, cachedData as DBObject)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.length).toEqual(1);
          expect(cacheSpy).toHaveBeenCalledTimes(1);
          done();
        });
    });
  });
  describe('getFreshMemberCharacterActivity', () => {
    beforeEach(() => {
      fetchSpy.calls.reset();
    });
    it('should work', (done) => {
      fetchSpy.mockReturnValue(
        new Promise((res, rej) => {
          res({
            json: () =>
              new Promise((res2, rej2) => {
                rej2({ Response: mockActivityObj.data });
              })
          });
        })
      );
      const clanId = '1';
      const memberProfile = mockProfile;
      const characterId = 1;
      const activityId = '1';
      const cachedData: Partial<DBObject> = { ...mockActivityObj, createDate: new Date('1/1/1900') };

      activityService
        .getFreshMemberCharacterActivity(clanId, memberProfile, characterId, activityId, cachedData as DBObject)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.length).toEqual(1);
          // expect(cacheSpy).toHaveBeenCalledTimes(1);
          done();
        });
    });
    it('should return empty with no activities', () => {});
    it('should return empty privacy', () => {});
    it('should return cached data on error', () => {});
  });
  describe('groupActivitiesToMember', () => {
    it('should work', () => {});
  });
  describe('groupActivitiesToMembers', () => {
    it('should work', () => {});
  });
  describe('getAllActivitiesFromCache', () => {
    it('should work', () => {});
  });
  describe('updateAllActivityCache', () => {
    it('should work', () => {});
  });
  describe('getMemberActivity', () => {
    it('should work', () => {});
  });
  describe('getMemberCharacterActivitySerialized', () => {
    it('should work', () => {});
  });
});
