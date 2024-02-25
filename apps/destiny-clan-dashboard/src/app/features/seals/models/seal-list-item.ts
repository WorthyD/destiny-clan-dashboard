import { SealDefinition } from '@destiny-clan-dashboard/data/models';

export interface SealListItem {
  seal: SealDefinition;
  totalMembers: number;
  completedCount: number;
  gildedCount: number;
  isGilded: boolean;
}
