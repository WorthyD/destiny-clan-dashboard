import { TestBed } from '@angular/core/testing';

import { RegisterIconsService } from './register-icons.service';

describe('RegisterIconsService', () => {
  let service: RegisterIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
