import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MemberActivityUpdaterService } from './member-activity-updater.service';
import { ProfileRecentActivityWorkerService } from './profile-recent-activity.fake.service';
import { AppConfigService } from '@dcd/shared/utils/app-config';

describe('MemberActivityUpdaterService', () => {
  let service: MemberActivityUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MemberActivityUpdaterService,
        provideMockStore({
          initialState: {},
          selectors: []
        }),
        {
          provide: ProfileRecentActivityWorkerService,
          useValue: {}
        },
        {
          provide: AppConfigService,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(MemberActivityUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
