import { ViewerMetadata } from '@destiny/components';

import { BungieDatePipe, BungieDateTimePipe } from '@destiny/components/pipes/bungie-date';
import { MemberTypeComponent } from '@destiny/components/icons';
import { ClassCellComponent } from '../../components/class-cell/class-cell.component';
import { ClanMemberProfile } from '../../data-access/clans-roster.service';
import { MembershipTypes } from '@destiny/data/models';

interface ViewContext {
  item: ClanMemberProfile;
  datePipe: BungieDatePipe;
  dateTimePipe: BungieDateTimePipe;
}

export const CLAN_ROSTER_VIEWER_METADATA = new Map<string, ViewerMetadata<ClanMemberProfile, ViewContext>>([
  [
    'platform',
    {
      label: 'Platform',
      plainText: (item: ClanMemberProfile) => `${getMembershipType(item.member.destinyUserInfo.membershipType)}`,
      render: (item: ClanMemberProfile) => ({
        //        styles: {},
        component: MemberTypeComponent,
        data: { type: item.member?.destinyUserInfo?.membershipType || 0 }
        //text: `${item.member.destinyUserInfo.membershipType}`
      })
    }
  ],
  [
    'destinyDisplayName',
    {
      label: 'Destiny Display Name',
      isSticky: true,
      plainText: (item: ClanMemberProfile) => `${item.member?.destinyUserInfo?.displayName || ''}`,
      render: (item: ClanMemberProfile) => ({ text: `${item.member?.destinyUserInfo?.displayName || ''}` })
    }
  ],
  [
    'bungieDisplayName',
    {
      label: 'Bungie Display Name',
      plainText: (item: ClanMemberProfile) => `${item.member?.bungieNetUserInfo?.displayName || ''}`,
      render: (item: ClanMemberProfile) => ({ text: `${item.member?.bungieNetUserInfo?.displayName || ''}` })
    }
  ],
  [
    'characters',
    {
      label: 'Characters',
      plainText: (item: ClanMemberProfile) => ``,
      render: (item: ClanMemberProfile) => {
        const characterIds = item.profile?.profile?.data?.characterIds;
        return {
          classList: 'characters-cell',
          children: characterIds?.map((id) => {
            return {
              classList: 'character-cell',
              component: ClassCellComponent,
              data: {
                characterHash: id,
                profile: item.profile
              }
            };
          })
        };
      }
    }
  ],
  [
    'powerLevel',
    {
      label: '+',
      plainText: (item: ClanMemberProfile) => `${item.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus}`,
      render: (item: ClanMemberProfile) => ({
        classList: 'power-cell',
        text: `${item.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus}`
      })
    }
  ],
  [
    'activeTriumph',
    {
      label: 'Active Triumph',
      plainText: (item: ClanMemberProfile) => `${item.profile?.profileRecords?.data?.activeScore}`,
      render: (item: ClanMemberProfile) => ({
        text: `${item.profile?.profileRecords?.data?.activeScore}`
      })
    }
  ],
  [
    'lifetimeTriumph',
    {
      label: 'Lifetime Triumph',
      plainText: (item: ClanMemberProfile) => `${item.profile?.profileRecords?.data?.lifetimeScore}`,
      render: (item: ClanMemberProfile) => ({
        text: `${item.profile?.profileRecords?.data?.lifetimeScore}`
      })
    }
  ],
  [
    'clan',
    {
      label: 'Clan',
      plainText: (item: ClanMemberProfile) => `${item.clan.clanName}`,
      render: (item: ClanMemberProfile, context: ViewContext) => {
        return {
          text: `${item.clan.clanName}`
        };
      }
    }
  ],

  [
    'clanJoinDate',
    {
      label: 'Clan Join Date',
      plainText: (item: ClanMemberProfile, context: ViewContext) =>
        `${context.datePipe.transform(item.member?.joinDate as unknown as Date)}`,
      render: (item: ClanMemberProfile, context: ViewContext) => {
        return {
          text: `${context.datePipe.transform(item.member?.joinDate as unknown as Date)}`
        };
      }
    }
  ],
  [
    'dateLastPlayed',
    {
      label: 'Last Played',
      plainText: (item: ClanMemberProfile, context: ViewContext) => `${context.dateTimePipe.transform(item.profile?.profile.data.dateLastPlayed as unknown as Date)}`,
      render: (item: ClanMemberProfile, context: ViewContext) => {
        return {
          text: `${context.dateTimePipe.transform(item.profile?.profile.data.dateLastPlayed as unknown as Date)}`
        };
      }
    }
  ]

  //['name', { label: 'Name', render: (item) => ({ text: `${item.name}` }) }],
  //['startDate', { label: 'Start Date', render: (item) => ({ text: `${new Date(item.startDate).toDateString()}` }) }]
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
      return ``;
  }
}
