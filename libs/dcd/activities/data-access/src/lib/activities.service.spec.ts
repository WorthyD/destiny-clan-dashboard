import { TestBed } from '@angular/core/testing';

import { ActivitiesService } from './activities.service';

describe('ActivitiesService', () => {
  let service: ActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivitiesService,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(ActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
