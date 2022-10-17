import { TestBed } from '@angular/core/testing';

import { ProfileWorkerService } from './profile-worker.service';

describe('ProfileWorkerService', () => {
  let service: ProfileWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
