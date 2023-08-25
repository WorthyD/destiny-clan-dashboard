import { TestBed } from '@angular/core/testing';

import { BungieInfoService } from './bungie-info.service';

describe('BungieInfoService', () => {
  let service: BungieInfoService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(BungieInfoService);
  });

  it('should be created', () => {
    let service: BungieInfoService = new BungieInfoService(null, null);
    expect(service).toBeTruthy();
  });
});
