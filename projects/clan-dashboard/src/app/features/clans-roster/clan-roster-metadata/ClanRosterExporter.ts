import { ExporterMetadata } from '@destiny/components';
import { MembershipTypes } from '@destiny/data/models/enums';

// import { MockListItem } from './ListItems';
export const ROSTER_EXPORTER_METADATA = new Map<string, ExporterMetadata<ClanMemberProfile>>([
  [
    'desintyId',
    { label: 'Membership Id', text: (item: ClanMemberProfile) => item.member.destinyUserInfo.membershipId }
  ],
  [
    'platform',
    {
      label: 'Platform',
      text: (item: ClanMemberProfile) => getMembershipType(item.member.destinyUserInfo.membershipType)
    }
  ],
  ['destinyDisplayName', { label: 'Destiny Display Name', text: (item: ClanMemberProfile) => '' }],
  ['bungieDisplayName', { label: 'Bungie Display Name', text: (item: ClanMemberProfile) => '' }],
  ['characterOneType', { label: 'Character One Type', text: (item: ClanMemberProfile) => '' }],
  ['characgerOnePower', { label: 'Character One Power', text: (item: ClanMemberProfile) => '' }],
  ['characterTwoType', { label: 'Character Two Type', text: (item: ClanMemberProfile) => '' }],
  ['characgerTwoPower', { label: 'Character Two Power', text: (item: ClanMemberProfile) => '' }],
  ['characterThreeType', { label: 'Character Three Type', text: (item: ClanMemberProfile) => '' }],
  ['characterThreePower', { label: 'Character Three Power', text: (item: ClanMemberProfile) => '' }],
  ['powerBonus', { label: 'Power Bonus', text: (item: ClanMemberProfile) => '' }],
  ['activeTriumph', { label: 'Active Triumph', text: (item: ClanMemberProfile) => '' }],
  ['lifeTimeTriumph', { label: 'Lifetime Triumph', text: (item: ClanMemberProfile) => '' }],
  ['clanJoinDate', { label: 'Clan Join Date', text: (item: ClanMemberProfile) => '' }],
  ['lastPlayed', { label: 'Last Played', text: (item: ClanMemberProfile) => '' }]
]);

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
      return '';
  }
}
/* applyValues(stats: ClanMemberListItem[]) {
    return stats.map((x) => {
      const firstChar = x.profile.profile.data.characterIds[0];
      const secondChar = x.profile.profile.data.characterIds[1];
      const thirdChar = x.profile.profile.data.characterIds[2];

      return {
        'Destiny Membership Id': x.member.destinyUserInfo.membershipId,
        Platform: this.getMembershipType(x.member.destinyUserInfo.membershipType),
        'Destiny Display Name': x.member.destinyUserInfo?.displayName,
        'Bungie Display Name': x.member.bungieNetUserInfo?.displayName,
        'Character One Type': this.getClassType(x.profile.characters.data[firstChar]?.classType) || '',
        'Character One Power': x.profile.characters.data[firstChar]?.light || '',
        'Character Two Type': this.getClassType(x.profile.characters.data[secondChar]?.classType),
        'Character Two Power': x.profile.characters.data[secondChar]?.light || '',
        'Character Three Type': this.getClassType(x.profile.characters.data[thirdChar]?.classType) || '',
        'Character Three Power': x.profile.characters.data[thirdChar]?.light || '',
        'Power Bonus': x.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus,
        'Active Triumph': x.profile?.profileRecords?.data?.activeScore,
        'Lifetime Triumph': x.profile?.profileRecords?.data?.lifetimeScore,
        'Clan Join Date': x.member?.joinDate,
        'Last Played': x.profile?.profile.data.dateLastPlayed
      };
    });
  }*/
