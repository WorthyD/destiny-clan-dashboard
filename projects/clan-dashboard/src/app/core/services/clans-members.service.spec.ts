import { TestBed } from '@angular/core/testing';

import { ClansMembersService } from './clans-members.service';

describe('ClansMembersService', () => {
  let service: ClansMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClansMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
