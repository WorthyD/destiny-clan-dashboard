//import { FiltererMetadata, textMatchesEquality } from '@destiny-clan-dashboard/components';
// import { ProfileRecentActivity } from '../../models/profile-recent-activity';
import { ProfileRecentActivity } from '@dcd/roster-recent-activity/models';
import { FiltererMetadata } from '@dcd/shared/data-models';
// import { numberMatchesEquality } from '../data/utility/filter-matcher';
// import { MockListItem } from './ListItems';

export const RECENT_ACTIVITY_FILTERER_METADATA = new Map<string, FiltererMetadata<ProfileRecentActivity>>([
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
