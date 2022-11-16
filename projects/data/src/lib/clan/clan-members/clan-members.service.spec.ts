import { TestBed } from '@angular/core/testing';

import { ClanDatabase } from '../ClanDatabase';
import { GroupV2Service } from 'bungie-api-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MOCK_DB_CLAN_DETAILS, MOCK_CLAN_OVERVIEW } from '../../testing-utils/objects/clan-details.mock';
import { HttpErrorResponse } from '@angular/common/http';

import { ClanMembersService } from './clan-members.service';

describe('ClanMembersService', () => {
  let service: ClanMembersService;
  let dbService: ClanDatabase;
  let d2GroupService: GroupV2Service;


 beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupV2Service, ClanMembersService, ClanDatabase]
    });
    service = TestBed.inject(ClanMembersService);
    dbService = TestBed.inject(ClanDatabase);
    d2GroupService = TestBed.inject(GroupV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
