import { SealDefinition } from '@dcd/shared/models';

export interface SealListItem {
  seal: SealDefinition;
  totalMembers: number;
  completedCount: number;
  gildedCount: number;
  isGilded: boolean;
}
