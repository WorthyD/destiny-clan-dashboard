import { FiltererMetadata, textMatchesEquality } from '@destiny-clan-dashboard/shared/data';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
// import { numberMatchesEquality } from '../data/utility/filter-matcher';
// import { MockListItem } from './ListItems';

export const ACTIVITY_FILTERER_METADATA = new Map<string, FiltererMetadata<ClanMemberProfile>>([
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
