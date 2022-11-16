import { TestBed } from '@angular/core/testing';

import { ActivityDefinitionService } from './activity-definition.service';

describe('ActivityDefinitionService', () => {
  let service: ActivityDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
