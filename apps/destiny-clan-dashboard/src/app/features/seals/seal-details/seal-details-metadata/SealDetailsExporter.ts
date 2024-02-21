// import { ExporterMetadata } from '@destiny-clan-dashboard/components';
// import { MembershipTypes } from '@destiny-clan-dashboard/data/models/enums';

// import { SealClanMember } from '../../models/seal-clan-member';
// import { getMemberName } from '@destiny-clan-dashboard/data/utility';
// // import { MockListItem } from './ListItems';
// export const SEAL_DETAILS_EXPORTER_METADATA = new Map<string, ExporterMetadata<SealClanMember>>([
//   [
//     'destinyDisplayName',
//     {
//       label: 'Destiny Display Name',
//       text: (item: SealClanMember) => `${getMemberName(item.clanMember)}`
//     }
//   ],
//   [
//     'destinyClan',
//     {
//       label: 'Destiny Clan',
//       text: (item: SealClanMember) => `${item.clan.clanName}`
//     }
//   ],
//   [
//     'isComplete',
//     {
//       label: 'Is Completed',
//       text: (item: SealClanMember) => (item.sealProgression.isCompleted ? 'X' : '')
//     }
//   ],
//   [
//     'completeCount',
//     {
//       label: 'Completed Count',
//       text: (item: SealClanMember) => `${item.sealProgression.completedTriumphCount}`
//     }
//   ],
//   [
//     'totalCount',
//     {
//       label: 'Total Count',
//       text: (item: SealClanMember) => `${item.sealProgression.totalTriumphCount}`
//     }
//   ],

//   [
//     'progress',
//     {
//       label: 'Percent Complete',
//       text: (item: SealClanMember) => `${item.sealProgression.completionPercentage}%`
//     }
//   ]
// ]);
