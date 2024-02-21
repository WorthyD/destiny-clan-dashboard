export type ClanSearchResultItemType = 'player' | 'clan';

export interface ClanSearchResultItem {
  iconName: string;
  name: string;
  clanInfo: any;
  type: ClanSearchResultItemType;
  memberInfo?: any;
  id?: string;
}

// iconName: this.getIcon(membership.membershipType),
// name: displayName,
// membershipType: membership.membershipType,
// membershipId: membership.membershipId,
// type: 'player'
