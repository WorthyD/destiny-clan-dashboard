import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GroupV2Service } from 'bungie-api-angular';
import { ClanDatabase } from '../clan-database';
import { ClanDetailsService } from './clan-details.service';
import { DBObject } from '../../db/clan-indexed-db';
import { ClanDetails } from '../../models/ClanDetails';
import { getMockClan } from '../../models/__mocks__/clan-details';
import { defer, of } from 'rxjs';

// import { ClanDetailsService } from './clan-details.service';
// // import { ClanDatabase } from '../ClanDatabase';
// import { GroupV2Service } from 'bungie-api-angular';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of, defer, Observable } from 'rxjs';
// // import { MOCK_DB_CLAN_DETAILS, MOCK_CLAN_OVERVIEW } from '../../testing-utils/objects/clan-details.mock';
// import { HttpErrorResponse } from '@angular/common/http';
// import { ClanDatabase } from '../clan-database';
// import { nowPlusDays } from '../../utility/date-utils';
// import { DBObject } from '../../db/clan-indexed-db';
jest.mock('../clan-database');
jest.mock('bungie-api-angular');
const mockedDatabase = ClanDatabase as jest.Mock<ClanDatabase>;
const mockedGroupService = GroupV2Service as unknown as jest.Mock<GroupV2Service>;

const getMockClanObject: (id?: string, createDate?: Date, data?: Partial<ClanDetails>) => Partial<DBObject> = (
  id = '',
  createDate = new Date(),
  data = {}
) => {
  return {
    id,
    createDate,
    data: {
      ...getMockClan(data)
    } as ClanDetails
  };
};
describe('ClanDetailsService', () => {
  let service: ClanDetailsService;
  // let dbService: ClanDatabase;
  // let d2GroupService: GroupV2Service;
  const getFreshService = (clanDbPBase = new ClanDatabase(), groupService = new GroupV2Service(null, '', null)) => {
    return new ClanDetailsService(groupService, clanDbPBase);
  };

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   imports: [HttpClientTestingModule],
    //   providers: [GroupV2Service, ClanDetailsService, ClanDatabase]
    // });
    // service = TestBed.inject(ClanDetailsService);
    // dbService = TestBed.inject(ClanDatabase);
    // d2GroupService = TestBed.inject(GroupV2Service);
  });

  it('should be created', () => {
    service = getFreshService(new mockedDatabase());
    expect(service).toBeTruthy();
  });

  describe('getClanDetailsSerialized', () => {
    it('should return from cache if not stale', (done) => {
      const originalName = 'Original Name';
      const databaseName = 'Database Name';
      const clan = getMockClan({ groupId: '123455689', name: originalName });
      const getFnPromise = jest
        .fn()
        .mockResolvedValue(getMockClanObject(clan.groupId.toString(), new Date(), { ...clan, name: databaseName }));

      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise
        } as unknown as ClanDatabase;
      });
      1;

      const getGroupFn = jest.fn();
      mockedGroupService.mockImplementation(() => {
        return {
          groupV2GetGroup: getGroupFn
        } as unknown as GroupV2Service;
      });

      service = getFreshService(new mockedDatabase(), new mockedGroupService());

      service.getClanDetailsSerialized(clan.groupId.toString(), true).subscribe((x) => {
        expect(x.name).toEqual(databaseName);
        expect(getGroupFn).toHaveBeenCalledTimes(0);
        expect(getFnPromise).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('should call api if stale', (done) => {
      const originalName = 'Original Name';
      const databaseName = 'Database Name';
      const serviceName = 'Service Name';
      const clan = getMockClan({ groupId: '123455689', name: originalName });
      const getFnPromise = jest
        .fn()
        .mockResolvedValue(
          getMockClanObject(clan.groupId.toString(), new Date('1/1/1900'), { ...clan, name: databaseName })
        );
      const updateFn = jest.fn();
      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      1;

      const getGroupFn = jest.fn().mockReturnValue(of({ Response: { detail: { ...clan, name: serviceName } } }));
      mockedGroupService.mockImplementation(() => {
        return {
          groupV2GetGroup: getGroupFn
        } as unknown as GroupV2Service;
      });

      service = getFreshService(new mockedDatabase(), new mockedGroupService());

      service.getClanDetailsSerialized(clan.groupId.toString(), true).subscribe((x) => {
        expect(x.name).toEqual(serviceName);
        expect(getGroupFn).toHaveBeenCalledTimes(1);
        expect(getFnPromise).toHaveBeenCalledTimes(1);
        expect(updateFn).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('should call api if not present', (done) => {
      const originalName = 'Original Name';
      const serviceName = 'Service Name';
      const clan = getMockClan({ groupId: '123455689', name: originalName });
      const getFnPromise = jest.fn().mockResolvedValue(undefined);
      const updateFn = jest.fn();
      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      1;

      const getGroupFn = jest.fn().mockReturnValue(of({ Response: { detail: { ...clan, name: serviceName } } }));
      mockedGroupService.mockImplementation(() => {
        return {
          groupV2GetGroup: getGroupFn
        } as unknown as GroupV2Service;
      });

      service = getFreshService(new mockedDatabase(), new mockedGroupService());

      service.getClanDetailsSerialized(clan.groupId.toString(), true).subscribe((x) => {
        expect(x.name).toEqual(serviceName);
        expect(getGroupFn).toHaveBeenCalledTimes(1);
        expect(getFnPromise).toHaveBeenCalledTimes(1);
        expect(updateFn).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('should return cache data if api errors', (done) => {
      const originalName = 'Original Name';
      const databaseName = 'Database Name';
      const clan = getMockClan({ groupId: '123455689', name: originalName });
      const getFnPromise = jest
        .fn()
        .mockResolvedValue(
          getMockClanObject(clan.groupId.toString(), new Date('1/1/1900'), { ...clan, name: databaseName })
        );
      const updateFn = jest.fn();
      mockedDatabase.mockImplementation(() => {
        return {
          getById: getFnPromise,
          update: updateFn
        } as unknown as ClanDatabase;
      });
      1;

      const getGroupFn = jest.fn(() => defer(() => Promise.reject())) as jest.Mock;
      mockedGroupService.mockImplementation(() => {
        return {
          groupV2GetGroup: getGroupFn
        } as unknown as GroupV2Service;
      });

      service = getFreshService(new mockedDatabase(), new mockedGroupService());

      service.getClanDetailsSerialized(clan.groupId.toString(), true).subscribe((x) => {
        expect(x.name).toEqual(databaseName);
        expect(getGroupFn).toHaveBeenCalledTimes(1);
        expect(getFnPromise).toHaveBeenCalledTimes(1);
        expect(updateFn).toHaveBeenCalledTimes(0);
        done();
      });
    });

  });

  //   describe('clanDetails', () => {
  //     // Broken for some reason
  //     // it('should get profile from DB, but call service if expired', async (done) => {
  //     //   const dbGetSpy = spyOn(dbService, 'getById').and.callFake((repo, store, id) => {
  //     //     return of({ ...MOCK_DB_CLAN_DETAILS.find((x) => x.id === id) });
  //     //   });
  //     //   const updateSpy = spyOn(dbService, 'update').and.callThrough();
  //     //   const serviceSpy = spyOn(d2GroupService, 'groupV2GetGroup').and.callFake(() => {
  //     //     return of({
  //     //       Response: { detail: MOCK_CLAN_OVERVIEW }
  //     //     });
  //     //   });
  //     //   service.getClanDetailsSerialized(1).subscribe((x) => {
  //     //     expect(x).toBe(MOCK_CLAN_OVERVIEW);
  //     //     expect(dbGetSpy).toHaveBeenCalledTimes(1);
  //     //     expect(serviceSpy).toHaveBeenCalledTimes(1);
  //     //     expect(updateSpy).toHaveBeenCalledTimes(1);
  //     //     done();
  //     //   });
  //     // });
  //     const MOCK_CLAN_OVERVIEW = { groupId: '123' };
  //     const MOCK_DB_CLAN_DETAILS = [
  //       {
  //         id: 'ClanDetails',
  //         createDate: nowPlusDays(-10),
  //         data: MOCK_CLAN_OVERVIEW
  //       }
  //     ];
  //     it('should get profile from DB and not call service if cache is good', (done) => {
  //       //const mockDBItem = [{ ...MOCK_DB_CLAN_DETAILS[0], createDate: new Date() }];
  //       const dbGetSpy = spyOn(dbService, 'getById').and.callFake((repository, type, id) => {
  //         const m = { ...MOCK_DB_CLAN_DETAILS.find((x) => x.id === id) } as DBObject;
  //         m.createDate = new Date();
  //         return Promise.resolve(m);
  //       });
  //       const updateSpy = spyOn(dbService, 'update').and.callThrough();
  //       const serviceSpy = spyOn(d2GroupService, 'groupV2GetGroup').and.callFake(() => {
  //         return of({
  //           Response: { detail: MOCK_CLAN_OVERVIEW }
  //         }) as Observable<any>;
  //       });
  //       service.getClanDetailsSerialized('123').subscribe((x) => {
  //         expect(x).toBe(MOCK_CLAN_OVERVIEW);
  //         expect(dbGetSpy).toHaveBeenCalledTimes(1);
  //         expect(serviceSpy).toHaveBeenCalledTimes(0);
  //         expect(updateSpy).toHaveBeenCalledTimes(0);
  //         done();
  //       });
  //     });
  //     it('should call service if not in DB', (done) => {
  //       const dbGetSpy = spyOn(dbService, 'getById').and.callFake((repository, type, id) => {
  //         return Promise.resolve(null);
  //       });
  //       const updateSpy = spyOn(dbService, 'update').and.callThrough();
  //       const serviceSpy = spyOn(d2GroupService, 'groupV2GetGroup').and.callFake(() => {
  //         return of({
  //           Response: { detail: MOCK_CLAN_OVERVIEW }
  //         }) as Observable<any>;
  //       });
  //       service.getClanDetailsSerialized('123').subscribe((x) => {
  //         expect(x.groupId).toBe(MOCK_CLAN_OVERVIEW.groupId);
  //         expect(dbGetSpy).toHaveBeenCalledTimes(1);
  //         expect(serviceSpy).toHaveBeenCalledTimes(1);
  //         expect(updateSpy).toHaveBeenCalledTimes(1);
  //         done();
  //       });
  //     });
  //     // it('should handle API down with DB data', async (done) => {
  //     //   const dbGetSpy = spyOn(dbService, 'getById').and.callFake((repo, store, id) => {
  //     //     const m = { ...MOCK_DB_CLAN_DETAILS.find((x) => x.id === id) };
  //     //     m.createDate = new Date();
  //     //     return of(m);
  //     //   });
  //     //   const updateSpy = spyOn(dbService, 'update').and.callThrough();
  //     //   const errorResponse = new HttpErrorResponse({
  //     //     error: '404 error',
  //     //     status: 404,
  //     //     statusText: 'Not Found'
  //     //   });
  //     //   const serviceSpy = spyOn(d2GroupService, 'groupV2GetGroup').and.callFake(() => {
  //     //     return defer(() => Promise.reject(errorResponse));
  //     //   });
  //     //   service.getClanDetailsSerialized('1').subscribe((x) => {
  //     //     expect(x).toBeTruthy();
  //     //     expect(dbGetSpy).toHaveBeenCalledTimes(1);
  //     //     expect(serviceSpy).toHaveBeenCalledTimes(0);
  //     //     expect(updateSpy).toHaveBeenCalledTimes(0);
  //     //     done();
  //     //   });
  //     // });
  //     // it('should handle API down with no DB data', async (done) => {
  //     //   const dbGetSpy = spyOn(dbService, 'getById').and.callFake(() => {
  //     //     return of([]);
  //     //   });
  //     //   const updateSpy = spyOn(dbService, 'update').and.callThrough();
  //     //   const errorResponse = new HttpErrorResponse({
  //     //     error: '404 error',
  //     //     status: 404,
  //     //     statusText: 'Not Found'
  //     //   });
  //     //   const serviceSpy = spyOn(d2GroupService, 'groupV2GetGroup').and.callFake(() => {
  //     //     return defer(() => Promise.reject(errorResponse));
  //     //   });
  //     //   service.getClanDetailsSerialized(1).subscribe(
  //     //     (x) => fail('should have returned error'),
  //     //     (error: HttpErrorResponse) => {
  //     //       expect(error.status).toEqual(404);
  //     //       expect(error.error).toContain('404 error');
  //     //       done();
  //     //     }
  //     //   );
  //     // });
  //     // it('should handle API down with no DB data', () => {
  //     //   const dbGetSpy = spyOn(dbService, 'getValues').and.callFake(() => {
  //     //     return { MemberProfiles: of([]) };
  //     //   });
  //     //   const updateSpy = spyOn(dbService, 'update').and.callThrough();
  //     //   const errorResponse = new HttpErrorResponse({
  //     //     error: '404 error',
  //     //     status: 404,
  //     //     statusText: 'Not Found'
  //     //   });
  //     //   const serviceSpy = spyOn(d2Service, 'destiny2GetProfile').and.callFake(() => {
  //     //     return defer(() => Promise.reject(errorResponse));
  //     //   });
  //     //   service.getSerializedProfile('1', mockOldMember as ClanMember).subscribe(
  //     //     (x) => fail('should have returned error'),
  //     //     (error: HttpErrorResponse) => {
  //     //       expect(error.status).toEqual(404);
  //     //       expect(error.error).toContain('404 error');
  //     //     }
  //     //   );
  //     // });
  //   });
});
