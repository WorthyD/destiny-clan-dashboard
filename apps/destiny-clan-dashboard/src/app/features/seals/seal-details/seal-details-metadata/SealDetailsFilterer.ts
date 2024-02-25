import { FiltererMetadata, textMatchesEquality } from '@destiny-clan-dashboard/components';
import { SealClanMember } from '../../models/seal-clan-member';
// import { numberMatchesEquality } from '../data/utility/filter-matcher';
// import { MockListItem } from './ListItems';

export const SEAL_DETAILS_FILTERER_METADATA = new Map<string, FiltererMetadata<SealClanMember>>([
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
