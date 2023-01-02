import { Injectable } from '@angular/core';
import {
  DestinyDefinitionsCollectiblesDestinyCollectibleAcquisitionBlock,
  DestinyDefinitionsCollectiblesDestinyCollectibleDefinition,
  DestinyDefinitionsMetricsDestinyMetricDefinition
} from 'bungie-api-angular';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {
  metricDefinitions: DestinyDefinitionsMetricsDestinyMetricDefinition[];
  collectibleDefinition: DestinyDefinitionsCollectiblesDestinyCollectibleDefinition[];

  initializeCache(data: any) {
    if (data.DestinyMetricDefinition) {
      this.metricDefinitions = data.DestinyMetricDefinition;
    }
    if (data.DestinyCollectibleDefinition) {
      this.collectibleDefinition = data.DestinyCollectibleDefinition;
    }
  }
}
