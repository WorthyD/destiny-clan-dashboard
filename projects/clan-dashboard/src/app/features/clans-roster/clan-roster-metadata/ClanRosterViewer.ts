import { ViewerMetadata } from '@destiny/components';
import { ClanMemberProfile } from '../clans-roster.service';

export const CLAN_ROSTER_VIEWER_METADATA = new Map<string, ViewerMetadata<ClanMemberProfile>>([
  [
    'platform',
    { label: 'Platform', render: (item: ClanMemberProfile) => ({ styles: { fontWeight: 'bold' }, text: `${item.member.destinyUserInfo.membershipType}` }) }
  ],
  ['destinyDisplayName', { label: 'Destiny Display Name', render: (item: ClanMemberProfile) => ({ text: `${item.member.destinyUserInfo.displayName}` }) }],
  //['name', { label: 'Name', render: (item) => ({ text: `${item.name}` }) }],
  //['startDate', { label: 'Start Date', render: (item) => ({ text: `${new Date(item.startDate).toDateString()}` }) }]
]);
