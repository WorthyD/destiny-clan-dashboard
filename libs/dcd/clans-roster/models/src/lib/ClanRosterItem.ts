import { BungieInfo } from '@destiny-clan-dashboard/data/models';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';

export interface ClanRosterItem extends ClanMemberProfile{
  bungieInfo?: BungieInfo;
}
