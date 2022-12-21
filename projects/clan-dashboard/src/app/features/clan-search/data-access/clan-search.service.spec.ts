import { TestBed } from '@angular/core/testing';

import { ClanSearchService } from './clan-search.service';

describe('ClanSearchService', () => {
  let service: ClanSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClanSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
