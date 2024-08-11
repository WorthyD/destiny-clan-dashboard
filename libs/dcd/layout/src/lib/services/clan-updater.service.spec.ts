import { TestBed } from '@angular/core/testing';
// import { selectEnabledClans } from '@core/store/clans';
// import { ClanMembersService } from '@destiny-clan-dashboard/data/clan/clan-members';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ClanUpdaterService } from './clan-updater.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// TOOD: FIgure out better solution for this
///import { ClanMembersServiceMock } from '../../../../../../data/src/lib/clan/clan-members/clan-members.service.mock';
import { of, take } from 'rxjs';
import { ClanDetailsService, ClanMembersService } from '@dcd/shared/data-access/clan-collections';
import { ProfileUpdaterService, ProfileWorkerService } from '@dcd/shared/data-access/profile';
//import { ProfileWorkerServiceMock } from '../../../workers/profile-worker/profile-worker.service.mock';
/// import { ProfileWorkerService } from '../../../workers/profile-worker/profile-worker.service';
// import { AppConfig } from '@core/config/app-config';
// import { MockConfig } from '@core/config/app-config.mock';
import { selectEnabledClans } from '@dcd/shared/data-access/store';
import { AppConfigService } from '@dcd/shared/utils/app-config';
import { MemberActivityUpdaterService } from '@dcd/shared/data-access/member-activity';
import { BungieInfoUpdaterService } from '@dcd/shared/data-access/bungie-info';
import { MatDialog } from '@angular/material/dialog';

describe('ClanUpdaterService', () => {
  let service: ClanUpdaterService;
  let memberService: ClanMembersService;
  let profileWorker: ProfileWorkerService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        {
          provide: ClanMembersService,
          useValue: {
            getClanMembersSerialized: jest.fn()
          }
        },
        { provide: ProfileWorkerService, useValue: {} },
        {
          provide: ClanDetailsService,
          useValue: {
            getClanDetailsSerialized: of(jest.fn())
          }
        },
        {
          provide: AppConfigService,
          useValue: {
            config: {
              production: false
            }
          }
        },
        {
          provide: ProfileUpdaterService,
          useValue: {}
        },
        { provide: MemberActivityUpdaterService, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: BungieInfoUpdaterService, useValue: {} }
      ]
    });

    service = TestBed.inject(ClanUpdaterService);
    memberService = TestBed.inject(ClanMembersService);
    profileWorker = TestBed.inject(ProfileWorkerService);

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectEnabledClans, [
      {
        clanId: '1',
        enabled: true,
        memberUpdate: new Date('1/1/1900').toString(),
        profileUpdate: new Date('1/1/1900').toString(),
        bungieInfoUpdate: new Date('1/1/1900').toString(),
        clanName: '',
        clanTag: '',
        memberRecentActivityUpdate: new Date('1/1/1900').toString()
      },
      {
        clanId: '3',
        enabled: true,
        memberUpdate: new Date('1/1/1900').toString(),
        profileUpdate: new Date('1/1/1900').toString(),
        bungieInfoUpdate: new Date('1/1/1900').toString(),
        clanName: '',
        clanTag: '',
        memberRecentActivityUpdate: new Date('1/1/1900').toString()
      }
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //describe('update', async () => {
  // it('should update clan members', (done) => {
  //   const dataSourceSpy = jest.spyOn(memberService, 'getClanMembersSerialized');
  //   const storeSpy = jest.spyOn(store, 'dispatch');
  //   // service.update();
  //   service['showLog'] = false;
  //   const x = 'test';
  //   service
  //     .update()
  //     .pipe(take(1))
  //     .subscribe((result) => {
  //       //expect(service.update()).toBe('true');
  //       expect(dataSourceSpy).toHaveBeenCalledTimes(2);
  //       expect(dataSourceSpy).toHaveBeenCalledWith('1');
  //       expect(dataSourceSpy).toHaveBeenCalledWith('3');
  //       done();
  //     });
  // });
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
  //});
});
