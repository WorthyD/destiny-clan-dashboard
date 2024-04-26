import { TestBed } from '@angular/core/testing';

import { ClansDetailsService } from './clans-details.service';

describe('ClansDetailsService', () => {
  let service: ClansDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClansDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
