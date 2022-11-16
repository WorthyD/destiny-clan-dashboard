import { ViewerMetadata } from '@destiny/components';

import { ClanMemberProfile } from '../clans-roster.service';
import { BungieDatePipe, BungieDateTimePipe } from '@destiny/components/pipes/bungie-date';
import { MemberTypeComponent } from '@destiny/components/icons';
import { ClassCellComponent } from '../class-cell/class-cell.component';

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
      render: (item: ClanMemberProfile) => ({
        //        styles: {},
        component: MemberTypeComponent,
        data: { type: item.member.destinyUserInfo.membershipType }
        //text: `${item.member.destinyUserInfo.membershipType}`
      })
    }
  ],
  [
    'destinyDisplayName',
    {
      label: 'Destiny Display Name',
      render: (item: ClanMemberProfile) => ({ text: `${item.member.destinyUserInfo.displayName}` })
    }
  ],
  [
    'bungieDisplayName',
    {
      label: 'Bungie Display Name',
      render: (item: ClanMemberProfile) => ({ text: `${item.member.bungieNetUserInfo?.displayName}` })
    }
  ],
  [
    'characters',
    {
      label: 'Characters',
      render: (item: ClanMemberProfile) => {
        const characterIds = item.profile?.profile?.data?.characterIds;
        return {
          classList: 'characters-cell',
          children: characterIds.map((id) => {
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
      render: (item: ClanMemberProfile) => ({
        text: `${item.profile?.profileRecords?.data?.activeScore}`
      })
    }
  ],
  [
    'lifetimeTriumph',
    {
      label: 'Lifetime Triumph',
      render: (item: ClanMemberProfile) => ({
        text: `${item.profile?.profileRecords?.data?.lifetimeScore}`
      })
    }
  ],
  [
    'clan',
    {
      label: 'Clan',
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
