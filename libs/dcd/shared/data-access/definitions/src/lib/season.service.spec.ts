import { TestBed } from '@angular/core/testing';
import {
  DestinyDefinitionsSeasonsDestinySeasonDefinition,
  DestinyDefinitionsSeasonsDestinySeasonPassDefinition
} from 'bungie-api-angular';

import { SeasonService } from './season.service';

describe('SeasonService', () => {
  let service: SeasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set proper season', () => {
    // const seasons = [
    //   {
    //     hash: 1,
    //     seasonPassProgressionHash: 2,
    //     startDate: new Date('1/1/2023').toString()
    //   },
    //   {
    //     hash: 2,
    //     seasonPassProgressionHash: 3
    //   },
    //   {
    //     hash: 3,
    //     seasonPassProgressionHash: 4,
    //     startDate: new Date('1/1/1900').toString(),
    //     endDate: new Date('1/1/2022').toString()
    //   },
    //   {
    //     hash: 6,
    //     seasonPassProgressionHash: 5,
    //     startDate: new Date('1/1/2300').toString()
    //   }
    // ] as DestinyDefinitionsSeasonsDestinySeasonDefinition[];
    const seasons = {
      '1': {
        startDate: '2000-01-01T17:00:00Z',
        endDate: '2050-01-01T12:00:00Z',
        seasonPassHash: 3,
        seasonPassProgressionHash: 1941119796,
        artifactItemHash: 1213492937,
        sealPresentationNodeHash: 1270675696,
        startTimeInSeconds: '0',
        seasonalChallengesPresentationNodeHash: 3443694067,
        seasonPassUnlockHash: 0,
        seasonNumber:2,
        hash: 1,
      },
      '2': {
        startDate: '1990-06-04T12:00:00Z',
        endDate: '1999-01-01T12:00:00Z',
        seasonPassHash: 3,
        seasonPassProgressionHash: 1941119796,
        artifactItemHash: 1213492937,
        sealPresentationNodeHash: 1270675696,
        startTimeInSeconds: '0',
        seasonalChallengesPresentationNodeHash: 3443694067,
        seasonPassUnlockHash: 0,
        seasonNumber:1,
        hash: 2,
      }


    };

    const progressions = {
      '3': {
        displayProperties: {
        },
        rewardProgressionHash: 1628407317,
        prestigeProgressionHash: 3184735011,
        hash: 3,
        index: 0,
        redacted: false,
        blacklisted: false
      }
    };

    //const progressions = [{ hash: 2 }, { hash: 3 }] as DestinyDefinitionsSeasonsDestinySeasonPassDefinition[];
    service.init(seasons, progressions);
    expect(service?.currentSeason?.hash).toEqual(1);
    expect(service?.currentSeasonProgress?.hash).toEqual(3);
  });
});
