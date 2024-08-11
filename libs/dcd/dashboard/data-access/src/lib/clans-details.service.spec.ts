import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ClansDetailsService } from './clans-details.service';
import { SeasonService } from '@dcd/shared/data-access/definitions';
import { ClanDetailsService } from '@dcd/shared/data-access/clan-collections';

describe('ClansDetailsService', () => {
  let service: ClansDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClansDetailsService, provideMockStore(), SeasonService, { provide: ClanDetailsService, useValue: {} }]
    });
    service = TestBed.inject(ClansDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
