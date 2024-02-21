import { TestBed } from '@angular/core/testing';

import { GlobalSealsService } from './global-seals.service';

describe('GlobalSealsService', () => {
  let service: GlobalSealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
