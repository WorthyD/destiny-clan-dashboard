import { TestBed } from '@angular/core/testing';

import { ClansDetailsActivitiesService } from './clans-details-activities.service';

describe('ClansDetailsActivitiesService', () => {
  let service: ClansDetailsActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClansDetailsActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
