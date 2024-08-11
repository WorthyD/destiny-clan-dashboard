import { TestBed } from '@angular/core/testing';

import { ClansDetailsActivitiesService } from './clans-details-activities.service';
import { provideMockStore } from '@ngrx/store/testing';
import { ProfileRecentActivityWorkerService } from './profile-recent-activity.fake.service';

describe('ClansDetailsActivitiesService', () => {
  let service: ClansDetailsActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), ClansDetailsActivitiesService, ProfileRecentActivityWorkerService]
    });
    service = TestBed.inject(ClansDetailsActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
