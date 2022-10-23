import { TestBed } from '@angular/core/testing';
import { selectEnabledClans } from '@core/store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ClanUpdaterService } from './clan-updater.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// TOOD: FIgure out better solution for this
import { ClanMembersServiceMock } from '../../../../../data/src/lib/clan/clan-members/clan-members.service.mock';
import { take } from 'rxjs';
import { ProfileWorkerServiceMock } from '../../workers/profile-worker.service.mock';
import { ProfileWorkerService } from '../../workers/profile-worker.service';

fdescribe('ClanUpdaterService', () => {
  let service: ClanUpdaterService;
  let memberService: ClanMembersService;
  let profileWorker: ProfileWorkerService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        { provide: ClanMembersService, useClass: ClanMembersServiceMock },
        { provide: ProfileWorkerService, useClass: ProfileWorkerServiceMock }
      ]
    });
    service = TestBed.inject(ClanUpdaterService);
    memberService = TestBed.inject(ClanMembersService);
    profileWorker =  TestBed.inject(ProfileWorkerService);


    store = TestBed.inject(MockStore);
    store.overrideSelector(selectEnabledClans, [
      {
        clanId: '1',
        enabled: true,
        memberUpdate: new Date('1/1/1900').toString(),
        profileUpdate: new Date('1/1/1900').toString()
      },
      {
        clanId: '3',
        enabled: true,
        memberUpdate: new Date('1/1/1900').toString(),
        profileUpdate: new Date('1/1/1900').toString()
      }
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('update', () => {
    it('should update clan members', (done) => {
      const dataSourceSpy = spyOn(memberService, 'getClanMembersSerialized').and.callThrough();
      const storeSpy = spyOn(store, 'dispatch').and.callThrough();
      // service.update();
      const x = 'test';
      service
        .update()
        .pipe(take(1))
        .subscribe((result) => {
          //expect(service.update()).toBe('true');
          expect(dataSourceSpy).toHaveBeenCalledTimes(2);
          expect(dataSourceSpy).toHaveBeenCalledWith('1');
          expect(dataSourceSpy).toHaveBeenCalledWith('3');
          done();
        });
    });
    // it('should update clan profiles', (done) => {
    //   const dataSourceSpy = spyOn(profileWorker, 'loadProfiles').and.callThrough();
    //   // service.update();
    //   const x = 'test';
    //   service
    //     .update()
    //     .pipe(take(1))
    //     .subscribe((result) => {
    //       //expect(service.update()).toBe('true');
    //       expect(dataSourceSpy).toHaveBeenCalledTimes(2);
    //       done();
    //     });
    // });
  });
});
