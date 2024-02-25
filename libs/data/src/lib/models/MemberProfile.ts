
// Local model to work with web workers
export interface MemberProfile {
  id?: number;

  profile?: DestinyResponsesDestinyProfileResponseProfile;
  profileProgression?: any;
  profileRecords?: any;
  profileCollectibles?: any;
  metrics?: any;
  profileCommendations?: any;
  characters?: any;

  characterProgressions?: any;
  characterRecords?: any;
  characterCollectibles?: any;

}
export interface DestinyResponsesDestinyProfileResponseProfile {
  data?: DestinyEntitiesProfilesDestinyProfileComponent;
  privacy?: number;
  /**
   * If true, this component is disabled.
   */
  disabled?: boolean;
}
export interface DestinyEntitiesProfilesDestinyProfileComponent {
  userInfo?: DestinyEntitiesProfilesDestinyProfileComponentUserInfo;
  dateLastPlayed?: string;
  versionsOwned?: number;
  characterIds?: Array<number>;
  seasonHashes?: Array<number>;
  eventCardHashesOwned?: Array<number>;
  currentSeasonHash?: number;
  currentSeasonRewardPowerCap?: number;
  activeEventCardHash?: number;
  currentGuardianRank?: number;
  lifetimeHighestGuardianRank?: number;
}
export interface DestinyEntitiesProfilesDestinyProfileComponentUserInfo {
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
