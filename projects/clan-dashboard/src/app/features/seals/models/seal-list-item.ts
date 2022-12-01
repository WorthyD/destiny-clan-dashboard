import { DestinyDefinitionsPresentationDestinyPresentationNodeDefinition } from "bungie-api-angular";

export interface SealListItem {
  seal: SealDefinition;
  totalMembers: number;
  completedCount: number;
}

export interface SealDefinition extends  DestinyDefinitionsPresentationDestinyPresentationNodeDefinition {}
