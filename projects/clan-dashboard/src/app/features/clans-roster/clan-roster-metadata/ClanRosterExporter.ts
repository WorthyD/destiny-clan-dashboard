import { ExporterMetadata } from '@destiny/components';
import { MembershipTypes } from '@destiny/data/models/enums';
import { ClanMemberProfile } from '../clans-roster.service';

// import { MockListItem } from './ListItems';
export const CLAN_ROSTER_EXPORTER_METADATA = new Map<string, ExporterMetadata<ClanMemberProfile>>([
  [
    'destinyId',
    { label: 'Membership Id', text: (item: ClanMemberProfile) => `${item.member.destinyUserInfo.membershipId}` }
  ],
  [
    'platform',
    {
      label: 'Platform',
      text: (item: ClanMemberProfile) => getMembershipType(item.member.destinyUserInfo.membershipType)
    }
  ],
  [
    'destinyDisplayName',
    { label: 'Destiny Display Name', text: (item: ClanMemberProfile) => `${item.member.destinyUserInfo?.displayName}` }
  ],
  [
    'bungieDisplayName',
    { label: 'Bungie Display Name', text: (item: ClanMemberProfile) => `${item.member.bungieNetUserInfo?.displayName}` }
  ],
  [
    'characterOneType',
    {
      label: 'Character One Type',
      text: (item: ClanMemberProfile) =>
        getClassType(item?.profile?.characters?.data[item?.profile?.profile?.data?.characterIds[0]]?.classType) || ''
    }
  ],
  [
    'characterOnePower',
    {
      label: 'Character One Power',
      text: (item: ClanMemberProfile) =>
        `${item?.profile?.characters?.data[item?.profile?.profile?.data?.characterIds[0]]?.light || ''}`
    }
  ],
  [
    'characterTwoType',
    {
      label: 'Character Two Type',
      text: (item: ClanMemberProfile) =>
        getClassType(item?.profile?.characters?.data[item?.profile?.profile?.data?.characterIds[1]]?.classType) || ''
    }
  ],
  [
    'characterTwoPower',
    {
      label: 'Character Two Power',
      text: (item: ClanMemberProfile) =>
        `${item?.profile?.characters?.data[item?.profile?.profile?.data?.characterIds[1]]?.light || ''}`
    }
  ],
  [
    'characterThreeType',
    {
      label: 'Character Three Type',
      text: (item: ClanMemberProfile) =>
        getClassType(item?.profile?.characters?.data[item?.profile?.profile?.data?.characterIds[2]]?.classType) || ''
    }
  ],
  [
    'characterThreePower',
    {
      label: 'Character Three Power',
      text: (item: ClanMemberProfile) =>
        `${item?.profile?.characters?.data[item?.profile?.profile?.data?.characterIds[2]]?.light || ''}`
    }
  ],
  [
    'powerBonus',
    {
      label: 'Power Bonus',
      text: (item: ClanMemberProfile) => `${item.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus}`
    }
  ],
  [
    'activeTriumph',
    { label: 'Active Triumph', text: (item: ClanMemberProfile) => `${item.profile?.profileRecords?.data?.activeScore}` }
  ],
  [
    'lifeTimeTriumph',
    {
      label: 'Lifetime Triumph',
      text: (item: ClanMemberProfile) => `${item.profile?.profileRecords?.data?.lifetimeScore}`
    }
  ],
  ['clanJoinDate', { label: 'Clan Join Date', text: (item: ClanMemberProfile) => `${item.member?.joinDate}` }],
  [
    'lastPlayed',
    { label: 'Last Played', text: (item: ClanMemberProfile) => `${item.profile?.profile.data.dateLastPlayed}` }
  ]
]);

function getClassType(classType) {
  switch (classType) {
    case 0:
      return 'titan';
    case 1:
      return 'hunter';
    case 2:
      return 'warlock';
    default:
      return '';
  }
}
// TODO: Update to include epic
function getMembershipType(value) {
  switch (value) {
    case MembershipTypes.Xbox:
      return 'xbox';
    case MembershipTypes.Psn:
      return 'playstation';
    case MembershipTypes.Steam:
      return 'steam';
    case MembershipTypes.Stadia:
      return 'stadia';
    default:
      return ``;
  }
}
/* applyValues(stats: ClanMemberListItem[]) {
    return stats.map((x) => {
      const firstChar = item.profile.profile.data.characterIds[0];
      const secondChar = item.profile.profile.data.characterIds[1];
      const thirdChar = item.profile.profile.data.characterIds[2];

      return {
        'Destiny Membership Id': item.member.destinyUserInfo.membershipId,
        Platform: this.getMembershipType(item.member.destinyUserInfo.membershipType),
        'Destiny Display Name': item.member.destinyUserInfo?.displayName,
        'Bungie Display Name': item.member.bungieNetUserInfo?.displayName,
        'Character One Type': this.getClassType(item.profile.characters.data[firstChar]?.classType) || `${}`,
        'Character One Power': item.profile.characters.data[firstChar]?.light || `${}`,
        'Character Two Type': this.getClassType(item.profile.characters.data[secondChar]?.classType),
        'Character Two Power': item.profile.characters.data[secondChar]?.light || `${}`,
        'Character Three Type': this.getClassType(item.profile.characters.data[thirdChar]?.classType) || `${}`,
        'Character Three Power': item.profile.characters.data[thirdChar]?.light || `${}`,
        'Power Bonus': item.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus,
        'Active Triumph': item.profile?.profileRecords?.data?.activeScore,
        'Lifetime Triumph': item.profile?.profileRecords?.data?.lifetimeScore,
        'Clan Join Date': item.member?.joinDate,
        'Last Played': item.profile?.profile.data.dateLastPlayed
      };
    });
  }*/
