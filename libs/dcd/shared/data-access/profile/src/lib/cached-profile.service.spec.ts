// import { TestBed } from '@angular/core/testing';

import { IdbKeyValService } from '@dcd/shared/utils/storage';
import { CachedProfileService } from './cached-profile.service';
// import { IdbKeyValService } from '../storage/idb-key-val.service';

jest.mock('idb-keyval')
describe('CachedProfileService', () => {
  let service: CachedProfileService;

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   providers: [CachedProfileService, IdbKeyValService]
    // });
    // service = TestBed.inject(CachedProfileService);
  });

  it('should be created', () => {
    let service: CachedProfileService = new CachedProfileService(null as unknown as IdbKeyValService, '');
    expect(service).toBeTruthy();
  });
});
