import { FiltererMetadata } from '@dcd/shared/data-models';
import { ClanMemberProfile } from '@dcd/shared/models';
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
