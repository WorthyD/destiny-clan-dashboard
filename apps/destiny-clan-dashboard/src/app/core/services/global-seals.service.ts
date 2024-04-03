import { Injectable } from '@angular/core';
import { AppConfig } from '@core/config/app-config';
import { DefinitionService } from '@dcd/shared/data-access/definitions';
import { DestinyDefinitionsPresentationDestinyPresentationNodeDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsPresentationDestinyPresentationNodeDefinition';

@Injectable({
  providedIn: 'root'
})
export class GlobalSealsService {
  constructor(private appConfig: AppConfig, private definitionService: DefinitionService) {}
  currentSealNodes = this.definitionService.presentationDefinition[this.appConfig.constants.CURRENT_SEALS_HASH];
  legacySealNodes = this.definitionService.presentationDefinition[this.appConfig.constants.LEGACY_SEALS_HASH];

  //allNodes = this.getNodes(this.currentSealNodes).concat(this.getNodes(this.legacySealNode));
  allNodes = this.getNodes(this.currentSealNodes);
  allNodesWLegacy = this.getNodes(this.currentSealNodes).concat(this.getNodes(this.legacySealNodes));

  sealNodes: DestinyDefinitionsPresentationDestinyPresentationNodeDefinition[] = this.getDefinitionsByHash(
    this.allNodes
  );
  sealNodesWLegacy: DestinyDefinitionsPresentationDestinyPresentationNodeDefinition[] = this.getDefinitionsByHash(
    this.allNodesWLegacy
  );

  private getNodes(node) {
    return node.children.presentationNodes.map((x) => x.presentationNodeHash);
  }

  private getDefinitionsByHash(allNodes: any[]) {
    return allNodes.map((h) => {
      return this.definitionService.presentationDefinition[h];
    });
  }
}
