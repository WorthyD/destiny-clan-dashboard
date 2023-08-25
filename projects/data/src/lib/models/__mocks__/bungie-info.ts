import { BungieInfo } from '../BungieInfo';

const getFakeBungieInfo = (override?: Partial<BungieInfo>): BungieInfo => {
  return {
    membershipId:'',
    uniqueName:'',
    displayName:'',

  };
};
