import { TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { ClansRosterService } from './clans-roster.service';
import { ClanBungieInfoService } from '@dcd/shared/data-access/clan-collections';

describe('ClansRosterService', () => {
  let service: ClansRosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClansRosterService, provideMockStore(), { provide: ClanBungieInfoService, useValue: {} }]
    });
    service = TestBed.inject(ClansRosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
