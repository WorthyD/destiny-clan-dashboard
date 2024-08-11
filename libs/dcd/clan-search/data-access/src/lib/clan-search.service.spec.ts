import { TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { ClanSearchService } from './clan-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroupV2Service } from 'bungie-api-angular';

describe('ClanSearchService', () => {
  let service: ClanSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClanSearchService, provideMockStore(), { provide: GroupV2Service, useValue: {} }]
    });
    service = TestBed.inject(ClanSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
