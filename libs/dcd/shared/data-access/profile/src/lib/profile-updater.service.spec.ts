import { TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { ProfileUpdaterService } from './profile-updater.service';
import { ProfileWorkerService } from './profile-worker.fake.service';
import { SeasonService } from '@dcd/shared/data-access/definitions';
import { AppConfigService } from '@dcd/shared/utils/app-config';

describe('ProfileUpdaterService', () => {
  let service: ProfileUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        {
          provide: ProfileWorkerService,
          useValue: {}
        },
        {
          provide: SeasonService,
          useValue: {}
        },
        {
          provide: AppConfigService,
          useValue: {
            config: {
              apiKey: ''
            }
          }
        }
      ]
    });
    service = TestBed.inject(ProfileUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
