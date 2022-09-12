import { Injectable } from '@angular/core';
import { ActivityDefinitionService } from '@core/definition-services/activity-definition.service';
import { ActivityModeDefinitionService } from '@core/definition-services/activity-mode-definition.service';
import { MilestoneDefinitionService } from '@core/definition-services/milestone-definition.service';
import { PresentationNodeDefinitionService } from '@core/definition-services/presentation-node-definition.service';
import { ManifestLoaderService } from '@destiny/data/manifest';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  constructor(
    private loader: ManifestLoaderService,
    private activityService: ActivityDefinitionService,
    private activityModeService: ActivityModeDefinitionService,
    private milestoneDefinitionService: MilestoneDefinitionService,
    private presentationNodeDefinitionService: PresentationNodeDefinitionService
  ) {}

  loadManifest() {
    console.time('loadManifest');
    const tables = [
      //'DestinyChecklistDefinition',
      //'DestinyObjectiveDefinition',
      //'DestinyStatDefinition',
      //'DestinyVendorDefinition',
      //'DestinyInventoryItemDefinition',
      //'DestinyClassDefinition',
      //'DestinySandboxPerkDefinition',
      //'DestinyEnergyTypeDefinition',
      //'DestinyCollectibleDefinition',
      'DestinyPresentationNodeDefinition',
      //'DestinyRecordDefinition',
      'DestinySeasonDefinition',
      //'DestinySeasonPassDefinition',
      'DestinyMilestoneDefinition',
      'DestinyActivityDefinition',
      'DestinyActivityModeDefinition'
      //'DestinyPlaceDefinition',
      //'DestinyFactionDefinition'
    ];
    return this.loader
      .loadManifestData('en', tables)
      .then((x) => {
        if (x && x.data) {
          if (x.data.DestinyActivityModeDefinition) {
            this.activityModeService.initializeCache(x.data.DestinyActivityModeDefinition);
          }
          if (x.data.DestinyActivityDefinition) {
            this.activityService.initializeCache(x.data.DestinyActivityDefinition);
          }

          if (x.data.DestinyMilestoneDefinition) {
            this.milestoneDefinitionService.initializeCache(x.data.DestinyMilestoneDefinition);
          }
          if (x.data.DestinyPresentationNodeDefinition) {
            this.presentationNodeDefinitionService.initializeCache(x.data.DestinyPresentationNodeDefinition);
          }
        }

        console.timeEnd('loadManifest');
        return true;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}
