import { TestBed } from '@angular/core/testing';

import { GroupV2Service } from 'bungie-api-angular';
import { ClanDetailService } from './clan-detail.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { ClanDatabase } from 'libs/data/src/lib/clan/clan-database';

describe('ClanDetailService', () => {
  let service: ClanDetailService;

  beforeEach(() => {
    //TestBed.configureTestingModule({});
    const gsv2 = {} as GroupV2Service;
    const httpClient = {} as HttpClient;
    const store = {} as Store;
    const db = {} as ClanDatabase;

    service = new ClanDetailService(gsv2, httpClient, store, db);
    service = TestBed.inject(ClanDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
