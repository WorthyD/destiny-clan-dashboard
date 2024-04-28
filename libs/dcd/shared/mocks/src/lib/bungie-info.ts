// import { BungieInfo } from '../BungieInfo';
import { BungieInfo } from '@dcd/shared/models';

const getFakeBungieInfo = (override?: Partial<BungieInfo>): BungieInfo => {
  return {
    membershipId: '',
    uniqueName: '',
    displayName: ''
  };
};
