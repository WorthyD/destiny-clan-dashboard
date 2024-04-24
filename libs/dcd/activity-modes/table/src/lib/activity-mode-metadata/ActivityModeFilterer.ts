import { FiltererMetadata, textMatchesEquality } from '@destiny-clan-dashboard/shared/data';
//import { ProfileRecentActivity } from '../../../../../../../apps/destiny-clan-dashboard/src/app/features/activity-modes/models/ProfileActivityMode';
import {ProfileRecentActivity} from '@dcd/activity-modes/models';
// import { numberMatchesEquality } from '../data/utility/filter-matcher';
// import { MockListItem } from './ListItems';

export const ACTIVITY_MODE_FILTERER_METADATA = new Map<string, FiltererMetadata<ProfileRecentActivity>>([
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
