import { SealListItem } from '../seal-list-item';
import { getRandomNumber } from '@destiny/data/utility';
import { MOCK_SEAL_DEFINITION } from 'projects/data/src/lib/models/__mocks__/seal-definition.mock';

export const getRandomSLI= () => {
  return { seal: MOCK_SEAL_DEFINITION, totalMembers: 100, completedCount: getRandomNumber(1, 100) } as SealListItem;
};
