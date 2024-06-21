// import { TestBed } from '@angular/core/testing';

import { CachedProfileService } from './cached-profile.service';
// import { IdbKeyValService } from '../storage/idb-key-val.service';

describe('CachedProfileService', () => {
  let service: CachedProfileService;

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   providers: [CachedProfileService, IdbKeyValService]
    // });
    // service = TestBed.inject(CachedProfileService);
  });

  it('should be created', () => {
    let service: CachedProfileService = new CachedProfileService(null, '');
    expect(service).toBeTruthy();
  });
});
