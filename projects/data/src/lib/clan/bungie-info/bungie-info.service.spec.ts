// import { TestBed } from '@angular/core/testing';

import { ClanBungieInfoService } from "./bungie-info.service";

// import { Destiny2Service } from 'bungie-api-angular';
// // import { MOCK_WORTHY_PROFILE } from '../../testing-utils/objects/profiles.mock';
// // import {
// //   MOCK_DB_ACTIVITIES,
// //   MOCK_RESP_ACTIVITIES_COMBINED,
// //   MOCK_RESP_ACTIVITIES_PAGE1,
// //   MOCK_RESP_ACTIVITIES_PAGE2,
// //   MOCK_RESP_ACTIVITIES_PAGE3
// // } from '../../testing-utils/objects/member-activities.mock';
// import { HttpErrorResponse } from '@angular/common/http';
// //import { ClanDatabase } from '../ClanDatabase';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ClanDatabase } from '../clan-database';
// import { ProfileService } from './profile.service';
// // import { of, defer, forkJoin } from 'rxjs';

describe('ClanBungieInfoService', () => {
  //   let service: ProfileService;
  //   let dbService: ClanDatabase;
  //   let d2Service: Destiny2Service;

  //   beforeEach(() => {
  //     const clanDatabase = new ClanDatabase();
  //     service = new ProfileService(clanDatabase, '');
  //     // TestBed.configureTestingModule({
  //     //   imports: [HttpClientTestingModule],
  //     //   providers: [Destiny2Service, ClanDatabase, ClanMemberRecentActivityService]
  //     // });
  //     // service = TestBed.inject(ClanMemberRecentActivityService);
  //     // dbService = TestBed.inject(ClanDatabase);
  //     // d2Service = TestBed.inject(Destiny2Service);
  //   });

  it('should be created', () => {
    const service: ClanBungieInfoService = new ClanBungieInfoService(null, null);
    expect(service).toBeTruthy();
  });
});
