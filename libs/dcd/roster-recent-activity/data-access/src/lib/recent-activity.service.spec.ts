import { TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { RecentActivityService } from './recent-activity.service';
import { ClanProfileService } from '@dcd/shared/data-access/clan-collections';
import { ProfileRecentActivityWorkerService } from './profile-recent-activity.fake.service';
import { SeasonService } from '@dcd/shared/data-access/definitions';

describe('RecentActivityService', () => {
  let service: RecentActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecentActivityService,
        provideMockStore({
          initialState: {},
          selectors: []
        }),
        {
          provide: ClanProfileService,
          useValue: {}
        },
        {
          provide: ProfileRecentActivityWorkerService,
          useValue: {}
        },
        {
          provide: SeasonService,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(RecentActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
