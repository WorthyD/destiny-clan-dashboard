import { TestBed } from '@angular/core/testing';

import { GlobalSealsService } from './global-seals.service';
import { AppConfigService } from '@dcd/shared/utils/app-config';
import { DefinitionService } from '@dcd/shared/data-access/definitions';

describe('GlobalSealsService', () => {
  let service: GlobalSealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalSealsService,
        {
          provide: AppConfigService,
          useValue: {
            config: {
              constants: {
                CURRENT_SEALS_HASH: '1',
                LEGACY_SEALS_HASH: '2'
              }
            }
          }
        },
        {
          provide: DefinitionService,
          useValue: {
            presentationDefinition: {
              '1': {
                children: {
                  presentationNodes: []
                }
              },
              '2': {
                children: {
                  presentationNodes: []
                }
              }
            }
          }
        }
      ]
    });
    service = TestBed.inject(GlobalSealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
