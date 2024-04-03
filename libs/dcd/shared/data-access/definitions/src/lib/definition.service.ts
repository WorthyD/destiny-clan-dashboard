import { Injectable } from '@angular/core';
import { SeasonService } from './season.service';
import { DestinyDefinitionsMetricsDestinyMetricDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsMetricsDestinyMetricDefinition';
import { DestinyDefinitionsCollectiblesDestinyCollectibleDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsCollectiblesDestinyCollectibleDefinition';
import { DestinyDefinitionsPresentationDestinyPresentationNodeDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsPresentationDestinyPresentationNodeDefinition';
import { DestinyDefinitionsRecordsDestinyRecordDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsRecordsDestinyRecordDefinition';
import { DestinyDefinitionsMilestonesDestinyMilestoneDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsMilestonesDestinyMilestoneDefinition';
import { DestinyDefinitionsDestinyActivityDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsDestinyActivityDefinition';
import { DestinyDefinitionsDestinyActivityModeDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsDestinyActivityModeDefinition';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {
  metricDefinitions: DestinyDefinitionsMetricsDestinyMetricDefinition[] = [];
  collectibleDefinition: DestinyDefinitionsCollectiblesDestinyCollectibleDefinition[] = [];
  presentationDefinition: DestinyDefinitionsPresentationDestinyPresentationNodeDefinition[] = [];
  recordDefinition: DestinyDefinitionsRecordsDestinyRecordDefinition[] = [];
  milestoneDefinition: DestinyDefinitionsMilestonesDestinyMilestoneDefinition[] = [];
  activityDefinition: DestinyDefinitionsDestinyActivityDefinition[] = [];
  activityModeDefinition: DestinyDefinitionsDestinyActivityModeDefinition[] = [];
  constructor(private seasonService: SeasonService) {}

  initializeCache(data: any) {
    if (data.DestinyMetricDefinition) {
      this.metricDefinitions = data.DestinyMetricDefinition;
    }
    if (data.DestinyCollectibleDefinition) {
      this.collectibleDefinition = data.DestinyCollectibleDefinition;
    }
    if (data.DestinyPresentationNodeDefinition) {
      this.presentationDefinition = data.DestinyPresentationNodeDefinition;
    }
    if (data.DestinyRecordDefinition) {
      this.recordDefinition = data.DestinyRecordDefinition;
    }
    if (data.DestinyMilestoneDefinition) {
      this.milestoneDefinition = data.DestinyMilestoneDefinition;
    }
    if (data.DestinyActivityDefinition) {
      this.activityDefinition = data.DestinyActivityDefinition;
    }

    if (data.DestinyActivityModeDefinition) {
      this.activityModeDefinition = data.DestinyActivityModeDefinition;
    }

    if (data.DestinySeasonDefinition && data.DestinySeasonPassDefinition) {
      this.seasonService.init(data.DestinySeasonDefinition, data.DestinySeasonPassDefinition);
    }
  }
}
