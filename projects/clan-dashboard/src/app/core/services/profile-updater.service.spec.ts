import { TestBed } from '@angular/core/testing';

import { ProfileUpdaterService } from './profile-updater.service';

describe('ProfileUpdaterService', () => {
  let service: ProfileUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
