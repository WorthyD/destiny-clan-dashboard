/**
 * Enum from web site
 * https://bungie-net.github.io/multi/schema_Destiny-DestinyActivityModeCategory.html#schema_Destiny-DestinyActivityModeCategory
 */
export interface DestinyActivityModeCategory {
  id: number;
  title: string;
  desc: string;
}

const NONE: DestinyActivityModeCategory = {
  id: 0,
  title: 'None',
  desc: 'Activities that are neither PVP nor PVE, such as social activities.'
};

const PvE: DestinyActivityModeCategory = {
  id: 1,
  title: 'PvE',
  desc: 'PvE activities, where you shoot aliens in the face.'
};

const PvP: DestinyActivityModeCategory = {
  id: 2,
  title: 'PvP',
  desc: 'PvP activities, where you shoot your "friends".'
};

const PvECompetitive: DestinyActivityModeCategory = {
  id: 3,
  title: 'PvECompetitive',
  desc: 'PVE competitive activities, where you shoot whoever you want whenever you want. Or run around collecting small glowing triangles.'
};

export const DESTINY_ACTIVITY_MODES: DestinyActivityModeCategory[] = [NONE, PvE, PvP, PvECompetitive];
