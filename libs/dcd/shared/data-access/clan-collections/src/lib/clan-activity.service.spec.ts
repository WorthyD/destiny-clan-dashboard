// import { TestBed } from '@angular/core/testing';

import { ClanDatabase } from '@dcd/shared/clan-db';
import { ClanActivityService } from './clan-activity.service';

// import { ClanActivityService } from './clan-activity.service';
// import { ClanDbModule } from '../clan-db/clan-db.module';
// import { ClanDatabase, ClanMemberRecentActivityService, ProfileService } from '../clan-db';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClanActivityService', () => {
  let service: ClanActivityService;

  beforeEach(() => {
    //     TestBed.configureTestingModule({
    //       imports: [HttpClientTestingModule],
    //       providers: [ClanMemberRecentActivityService, ProfileService, ClanDatabase]
    //     });
    //     service = TestBed.inject(ClanActivityService);
    const db = new ClanDatabase();
    service = new ClanActivityService(db, '');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
