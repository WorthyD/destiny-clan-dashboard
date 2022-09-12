import { TestBed } from '@angular/core/testing';

import { ManifestLoaderService } from './manifest-loader.service';

describe('ManifestLoaderService', () => {
  let service: ManifestLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManifestLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
