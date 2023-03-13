import { TestBed } from '@angular/core/testing';

import { CachedProfileService } from './cached-profile.service';

describe('CachedProfileService', () => {
  let service: CachedProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachedProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
