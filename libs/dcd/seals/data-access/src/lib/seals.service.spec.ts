import { TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { SealsService } from './seals.service';
import { GlobalSealsService } from '@dcd/shared/data-access/seals';
import { ClanProfileService } from '@dcd/shared/data-access/clan-collections';
import { DefinitionService, SeasonService } from '@dcd/shared/data-access/definitions';

describe('SealsService', () => {
  let service: SealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        { provide: DefinitionService, useValue: {} },
        { provide: SeasonService, useValue: {} },
        { provide: ClanProfileService, useValue: {} },
        { provide: GlobalSealsService, useValue: {} }
      ]
    });
    service = TestBed.inject(SealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
