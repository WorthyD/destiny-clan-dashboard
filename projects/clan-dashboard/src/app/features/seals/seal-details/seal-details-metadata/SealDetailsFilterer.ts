import { FiltererMetadata, textMatchesEquality } from '@destiny/components';
import { ClanMemberProfile } from '../data-access/clans-roster.service';
// import { numberMatchesEquality } from '../data/utility/filter-matcher';
// import { MockListItem } from './ListItems';

export const CLAN_ROSTER_FILTERER_METADATA = new Map<string, FiltererMetadata<ClanMemberProfile>>([
  // [
  //   'destinyDisplayName',
  //   {
  //     label: 'Destiny Display Name',
  //     type: 'text',
  //     matcher: (item, filter) =>
  //       textMatchesEquality(item.member.destinyUserInfo.displayName, filter.value, filter.equality)
  //   }
  // ]
]);
