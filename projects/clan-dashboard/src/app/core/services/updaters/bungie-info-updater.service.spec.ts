import { TestBed } from '@angular/core/testing';

import { BungieInfoUpdaterService } from './bungie-info-updater.service';

describe('BungieInfoUpdaterService', () => {
  let service: BungieInfoUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BungieInfoUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
