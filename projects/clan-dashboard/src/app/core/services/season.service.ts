import { Injectable } from '@angular/core';
import {
  DestinyDefinitionsSeasonsDestinySeasonDefinition,
  DestinyDefinitionsSeasonsDestinySeasonPassDefinition
} from 'bungie-api-angular';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  currentSeason: DestinyDefinitionsSeasonsDestinySeasonDefinition;
  currentSeasonProgress: DestinyDefinitionsSeasonsDestinySeasonPassDefinition;
  constructor() {}

  init(
    seasons: { [key: string]: DestinyDefinitionsSeasonsDestinySeasonDefinition },
    seasonPasses: { [key: string]: DestinyDefinitionsSeasonsDestinySeasonPassDefinition }
  ) {
    const now = new Date();
    const currentSeasonKey = Object.keys(seasons).find((seasonKey) => {
      const season = seasons[seasonKey];
      const hasEndAndNotPassed = !season.endDate || now < new Date(season.endDate);
      return season.startDate && new Date(season.startDate) < now && hasEndAndNotPassed;
    });

    this.currentSeason = seasons[currentSeasonKey];
    this.currentSeasonProgress = seasonPasses[this.currentSeason.seasonPassHash];
  }

  getSeasonProgressionHashes(): number[] {
    return [this.currentSeasonProgress.prestigeProgressionHash, this.currentSeasonProgress.rewardProgressionHash];
  }
}
