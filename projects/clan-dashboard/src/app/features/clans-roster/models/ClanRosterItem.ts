import { BungieInfo } from '@destiny/data/models';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';

export interface ClanRosterItem extends ClanMemberProfile{
  bungieInfo?: BungieInfo;
}
