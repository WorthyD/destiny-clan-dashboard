import { Injectable } from '@angular/core';
import { DestinyDefinitionsMetricsDestinyMetricDefinition } from 'bungie-api-angular';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {
  metricDefinitions: DestinyDefinitionsMetricsDestinyMetricDefinition[];

  initializeCache(data: any) {
    if (data.DestinyMetricDefinition) {
      this.metricDefinitions = data.DestinyMetricDefinition;
    }
  }
}
