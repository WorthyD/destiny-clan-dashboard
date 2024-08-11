import { TestBed } from '@angular/core/testing';

import { ActivityModeService } from './activity-mode.service';

describe('ActivityModeService', () => {
  let service: ActivityModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivityModeService!,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(ActivityModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
