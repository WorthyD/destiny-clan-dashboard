import { ClanMemberSeasonPassProgression } from '@dcd/shared/models';

export const getSeasonProgression = (
  override?: Partial<ClanMemberSeasonPassProgression>
): ClanMemberSeasonPassProgression => {
  return {
    progression: {
      progressionHash: 1627914615,
      dailyProgress: 0,
      dailyLimit: 0,
      weeklyProgress: 904695,
      weeklyLimit: 0,
      currentProgress: 904695,
      level: 10,
      levelCap: 100,
      stepIndex: 10,
      progressToNextLevel: 4695,
      nextLevelAt: 100000,
      ...override?.progression
    },
    prestigeProgression: {
      progressionHash: 4021269753,
      dailyProgress: 0,
      dailyLimit: 0,
      weeklyProgress: 0,
      weeklyLimit: 0,
      currentProgress: 0,
      level: 0,
      levelCap: -1,
      stepIndex: 0,
      progressToNextLevel: 0,
      nextLevelAt: 100000,
      ...override?.prestigeProgression
    }
  };
};

export const getSeasonMaxProgression = (
  override?: Partial<ClanMemberSeasonPassProgression>
): ClanMemberSeasonPassProgression => {
  return {
    progression: {
      progressionHash: 1627914615,
      dailyProgress: 0,
      dailyLimit: 0,
      weeklyProgress: 904695,
      weeklyLimit: 0,
      currentProgress: 904695,
      level: 100,
      levelCap: 100,
      stepIndex: 10,
      progressToNextLevel: 4695,
      nextLevelAt: 100000,
      ...override?.progression
    },
    prestigeProgression: {
      progressionHash: 4021269753,
      dailyProgress: 0,
      dailyLimit: 0,
      weeklyProgress: 0,
      weeklyLimit: 0,
      currentProgress: 0,
      level: 53,
      levelCap: -1,
      stepIndex: 0,
      progressToNextLevel: 0,
      nextLevelAt: 100000,
      ...override?.prestigeProgression
    }
  };
};
