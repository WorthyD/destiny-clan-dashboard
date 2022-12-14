import { SealDefinition } from "@destiny/data/models";

export interface SealListItem {
  seal: SealDefinition;
  totalMembers: number;
  completedCount: number;
}

