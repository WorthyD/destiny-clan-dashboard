import { BungieInfo } from '@dcd/shared/models';
import { ClanMemberProfile } from '@dcd/shared/models';

export interface ClanRosterItem extends ClanMemberProfile{
  bungieInfo?: BungieInfo;
}
