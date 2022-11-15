// import { SorterMetadata } from '../data/sorter';

import { SorterMetadata } from "@destiny/components";
import { ClanMemberProfile } from "../clans-roster.service";

// import { MockListItem } from './ListItems';
 export const CLAN_ROSTER_SORTER_METADATA = new Map<string, SorterMetadata<ClanMemberProfile>>([
//   [
//     'id',
//     {
//       label: 'ID',
//       comparator: (a, b) => (a.id < b.id ? -1 : 1)
//     }
//   ],
  [
    'destinyDisplayName',
    {
      label: 'Destiny Display Name',
      comparator: (a, b) => (a.member.destinyUserInfo.displayName.toLowerCase() < b.member.destinyUserInfo.displayName.toLowerCase() ? -1 : 1)
    }
  ]
 ]);
