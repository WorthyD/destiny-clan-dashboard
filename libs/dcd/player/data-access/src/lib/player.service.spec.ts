import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { CachedProfileService } from '@dcd/shared/data-access/profile';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerService,
        {
          provide: CachedProfileService,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
