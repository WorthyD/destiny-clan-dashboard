import { TestBed } from '@angular/core/testing';
import {
  DestinyDefinitionsSeasonsDestinySeasonDefinition,
  DestinyDefinitionsSeasonsDestinySeasonPassDefinition
} from 'bungie-api-angular';

import { SeasonService } from './season.service';

fdescribe('SeasonService', () => {
  let service: SeasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set proper season', () => {
    const seasons = [
      {
        hash: 1,
        seasonPassProgressionHash: 2,
        startDate: new Date('1/1/2023').toString()
      },
      {
        hash: 2,
        seasonPassProgressionHash: 3
      },
      {
        hash: 3,
        seasonPassProgressionHash: 4,
        startDate: new Date('1/1/1900').toString(),
        endDate: new Date('1/1/2022').toString()
      },
      {
        hash: 6,
        seasonPassProgressionHash: 5,
        startDate: new Date('1/1/2300').toString()
      }
    ] as DestinyDefinitionsSeasonsDestinySeasonDefinition[];

    const progressions = [{ hash: 2 }, { hash: 3 }] as DestinyDefinitionsSeasonsDestinySeasonPassDefinition[];
    service.init(seasons, progressions);
    expect(service.currentSeason.hash).toEqual(1);
    expect(service.currentSeasonProgress.hash).toEqual(2);
  });
});
