
export interface ClanMember {
  // Needed for DB
  id?: number;
  memberType?: number;
  isOnline?: boolean;
  lastOnlineStatusChange?: number;
  groupId?: number;
  destinyUserInfo?: GroupsV2GroupUserInfoCard;
  bungieNetUserInfo?: UserUserInfoCard;
  joinDate?: string;
}
export interface UserUserInfoCard {
  supplementalDisplayName?: string;

  iconPath?: string;

  crossSaveOverride?: number;

  applicableMembershipTypes?: Array<number>;

  isPublic?: boolean;

  membershipType?: number;

  membershipId?: number;

  displayName?: string;

  bungieGlobalDisplayName?: string;

  bungieGlobalDisplayNameCode?: number;
}
export interface GroupsV2GroupUserInfoCard {
  LastSeenDisplayName?: string;

  LastSeenDisplayNameType?: number;

  supplementalDisplayName?: string;

  iconPath?: string;

  crossSaveOverride?: number;

  applicableMembershipTypes?: Array<number>;

  isPublic?: boolean;

  membershipType?: number;

  membershipId?: number;

  displayName?: string;

  bungieGlobalDisplayName?: string;

  bungieGlobalDisplayNameCode?: number;
}
