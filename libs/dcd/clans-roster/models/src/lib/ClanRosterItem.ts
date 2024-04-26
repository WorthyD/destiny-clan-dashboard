import { BungieInfo } from '@destiny-clan-dashboard/data/models';
import { ClanMemberProfile } from '@dcd/shared/models';

export interface ClanRosterItem extends ClanMemberProfile{
  bungieInfo?: BungieInfo;
}
