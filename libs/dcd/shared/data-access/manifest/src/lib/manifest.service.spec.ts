import { TestBed } from '@angular/core/testing';

import { ManifestService } from './manifest.service';
import { ManifestLoaderService } from './manifest-loader.service';
import { DefinitionService } from '@dcd/shared/data-access/definitions';

describe('ManifestService', () => {
  let service: ManifestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ManifestLoaderService, useValue: {} }, { provide: DefinitionService, useValue: {} }]
    });
    service = TestBed.inject(ManifestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
