import { TestBed } from '@angular/core/testing';

import { ClansRosterService } from './clans-roster.service';

describe('ClansRosterService', () => {
  let service: ClansRosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClansRosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
