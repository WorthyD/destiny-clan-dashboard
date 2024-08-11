import { TestBed } from '@angular/core/testing';

import { BungieInfoService } from './bungie-info.service';
import { Destiny2Service, UserService } from 'bungie-api-angular';

describe('BungieInfoService', () => {
  let service: BungieInfoService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(BungieInfoService);
  });

  it('should be created', () => {
    let service: BungieInfoService = new BungieInfoService(
      null as unknown as Destiny2Service,
      null as unknown as UserService
    );
    expect(service).toBeTruthy();
  });
});
