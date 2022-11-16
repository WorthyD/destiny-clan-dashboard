import { TestBed } from '@angular/core/testing';

import { PresentationNodeDefinitionService } from './presentation-node-definition.service';

describe('PresentationNodeDefinitionService', () => {
  let service: PresentationNodeDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentationNodeDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
