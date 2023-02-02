import { ViewerMetadata } from '@destiny/components';

import { BungieDatePipe, BungieDateTimePipe } from '@destiny/components/pipes/bungie-date';
import { MemberTypeComponent } from '@destiny/components/icons';
import { ClassCellComponent } from '../../components/class-cell/class-cell.component';
import { MembershipTypes } from '@destiny/data/models';
import { ClanRosterItem } from '@features/clans-roster/models/ClanRosterItem';

interface ViewContext {
  item: ClanRosterItem;
  datePipe: BungieDatePipe;
  dateTimePipe: BungieDateTimePipe;
}

export const CLAN_ROSTER_VIEWER_METADATA = new Map<string, ViewerMetadata<ClanRosterItem, ViewContext>>([
  [
    'platform',
    {
      label: 'Platform',
      plainText: (item: ClanRosterItem) => `${getMembershipType(item.member.destinyUserInfo.membershipType)}`,
      render: (item: ClanRosterItem) => ({
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
      plainText: (item: ClanRosterItem) => `${item.member?.destinyUserInfo?.displayName || ''}`,
      render: (item: ClanRosterItem) => ({ text: `${item.member?.destinyUserInfo?.displayName || ''}` })
    }
  ],
  [
    'bungieDisplayName',
    {
      label: 'Bungie Display Name',
      plainText: (item: ClanRosterItem) => `${item.member?.bungieNetUserInfo?.displayName || ''}`,
      render: (item: ClanRosterItem) => ({ text: `${item.member?.bungieNetUserInfo?.displayName || ''}` })
    }
  ],
  [
    'bungieUnique',
    {
      label: 'Bungie Unique Name',
      plainText: (item: ClanRosterItem) => `${item?.bungieInfo?.uniqueName || ''}`,
     // plainText: (item: ClanRosterItem) => ``,
      render: (item: ClanRosterItem) => ({ text: `${item.bungieInfo?.uniqueName  || ''}` })
    }
  ],
  [
    'psnName',
    {
      label: 'PSN Name',
      //plainText: (item: ClanRosterItem) => `${item?.bungieInfo?.psnDisplayName || ''}`,
      plainText: (item: ClanRosterItem) => `testing`,
      render: (item: ClanRosterItem) => ({ text: `${item.bungieInfo?.psnDisplayName  || ''}` })
    }
  ],
  [
    'xboxName',
    {
      label: 'XBox Name',
      plainText: (item: ClanRosterItem) => `${item?.bungieInfo?.xboxDisplayName || ''}`,
      render: (item: ClanRosterItem) => ({ text: `${item.bungieInfo?.xboxDisplayName  || ''}` })
    }
  ],
  [
    'steamName',
    {
      label: 'Steam Name',
      plainText: (item: ClanRosterItem) => `${item?.bungieInfo?.steamDisplayName || ''}`,
      render: (item: ClanRosterItem) => ({ text: `${item.bungieInfo?.steamDisplayName  || ''}` })
    }
  ],
  [
    'twitchName',
    {
      label: 'Twitch Name',
      plainText: (item: ClanRosterItem) => `${item?.bungieInfo?.twitchDisplayName || ''}`,
      render: (item: ClanRosterItem) => ({ text: `${item.bungieInfo?.twitchDisplayName  || ''}` })
    }
  ],
  [
    'characters',
    {
      label: 'Characters',
      plainText: (item: ClanRosterItem) => ``,
      render: (item: ClanRosterItem) => {
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
      plainText: (item: ClanRosterItem) => `${item.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus}`,
      render: (item: ClanRosterItem) => ({
        classList: 'power-cell',
        text: `${item.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus}`
      })
    }
  ],
  [
    'activeTriumph',
    {
      label: 'Active Triumph',
      plainText: (item: ClanRosterItem) => `${item.profile?.profileRecords?.data?.activeScore}`,
      render: (item: ClanRosterItem) => ({
        classList:['text-center'],
        text: `${item.profile?.profileRecords?.data?.activeScore}`
      })
    }
  ],
  [
    'lifetimeTriumph',
    {
      label: 'Lifetime Triumph',
      plainText: (item: ClanRosterItem) => `${item.profile?.profileRecords?.data?.lifetimeScore}`,
      render: (item: ClanRosterItem) => ({
        classList:['text-center'],
        text: `${item.profile?.profileRecords?.data?.lifetimeScore}`
      })
    }
  ],
  [
    'clan',
    {
      label: 'Clan',
      plainText: (item: ClanRosterItem) => `${item.clan.clanName}`,
      render: (item: ClanRosterItem, context: ViewContext) => {
        return {
          text: `${item.clan.clanName}`
        };
      }
    }
  ],
  [
    'bungieProfileCreation',
    {
      label: 'Bungie Join Date',
      plainText: (item: ClanRosterItem, context: ViewContext) =>
        `${context.datePipe.transform(item.bungieInfo?.firstAccess || new Date() as unknown as Date)}`,
      render: (item: ClanRosterItem, context: ViewContext) => {
        return {
          text: `${context.datePipe.transform(item.bungieInfo?.firstAccess || new Date() as unknown as Date)}`
        };
      }
    }
  ],
  [
    'clanJoinDate',
    {
      label: 'Clan Join Date',
      plainText: (item: ClanRosterItem, context: ViewContext) =>
        `${context.datePipe.transform(item.member?.joinDate as unknown as Date)}`,
      render: (item: ClanRosterItem, context: ViewContext) => {
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
      plainText: (item: ClanRosterItem, context: ViewContext) => `${context.dateTimePipe.transform(item.profile?.profile.data.dateLastPlayed as unknown as Date)}`,
      render: (item: ClanRosterItem, context: ViewContext) => {
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
