import { TestBed } from '@angular/core/testing';

import { ManifestDatabaseService } from './manifest-database.service';

describe('ManifestDatabaseService', () => {
  let service: ManifestDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManifestDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
