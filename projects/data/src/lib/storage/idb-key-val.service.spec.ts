import { TestBed } from '@angular/core/testing';

import { IdbKeyvalService } from './idb-keyval.service';

describe('IdbKeyvalService', () => {
  let service: IdbKeyvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbKeyvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
