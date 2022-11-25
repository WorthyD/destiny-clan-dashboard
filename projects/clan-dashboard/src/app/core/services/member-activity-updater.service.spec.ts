import { TestBed } from '@angular/core/testing';

import { MemberActivityUpdaterService } from './member-activity-updater.service';

describe('MemberActivityUpdaterService', () => {
  let service: MemberActivityUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberActivityUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
