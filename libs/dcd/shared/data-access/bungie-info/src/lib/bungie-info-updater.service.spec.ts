import { TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { BungieInfoUpdaterService } from './bungie-info-updater.service';
import { BungieInfoWorkerService } from './bungie-info-worker.fake.service';
import { AppConfigService } from '@dcd/shared/utils/app-config';

describe('BungieInfoUpdaterService', () => {
  let service: BungieInfoUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        {
          provide: BungieInfoWorkerService,
          useValue: {}
        },
        {
          provide: AppConfigService,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(BungieInfoUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
