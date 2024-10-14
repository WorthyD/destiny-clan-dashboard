import { MemberProfile } from '@dcd/shared/models';

export const getMockMemberProfile = (override?: Partial<MemberProfile>): MemberProfile => {
  return {
    profile: {
      data: {
        userInfo: {
          crossSaveOverride: 3,
          applicableMembershipTypes: [1, 2, 3],
          isPublic: true,
          membershipType: 3,
          membershipId: 4611686018467238913,
          displayName: 'WorthyD',
          bungieGlobalDisplayName: 'WorthyD',
          bungieGlobalDisplayNameCode: 2742
        },
        dateLastPlayed: '2023-12-06T10:15:16Z',
        characterIds: [2305843009310516628, 2305843009319768855, 2305843009319768858],
        seasonHashes: [
          1743682818, 1743682819, 2809059425, 2809059424, 2809059427, 2809059426, 2809059429, 2809059428, 2809059431,
          2809059430, 2809059433, 2809059432, 2758726568, 2758726569, 2758726570, 2758726571
        ],
        eventCardHashesOwned: [],
        currentSeasonHash: 2758726573,
        currentSeasonRewardPowerCap: 2010,
        currentGuardianRank: 5,
        lifetimeHighestGuardianRank: 7,
        renewedGuardianRank: 5
      },
      privacy: 1
    },
    profileProgression: {
      data: {
        checklists: {},
        seasonalArtifact: {
          artifactHash: 2894222926,
          pointProgression: {
            progressionHash: 1612979050,
            dailyProgress: 0,
            dailyLimit: 0,
            weeklyProgress: 0,
            weeklyLimit: 0,
            currentProgress: 0,
            level: 1,
            levelCap: 12,
            stepIndex: 1,
            progressToNextLevel: 0,
            nextLevelAt: 25000
          },
          pointsAcquired: 1,
          powerBonusProgression: {
            progressionHash: 4246308539,
            dailyProgress: 0,
            dailyLimit: 0,
            weeklyProgress: 0,
            weeklyLimit: 0,
            currentProgress: 0,
            level: 1,
            levelCap: -1,
            stepIndex: 1,
            progressToNextLevel: 0,
            nextLevelAt: 55000
          },
          powerBonus: 1
        }
      },
      privacy: 2
    },
    profileRecords: {
      data: {
        score: 15185,
        activeScore: 15185,
        legacyScore: 113067,
        lifetimeScore: 128252,
        records: {},

        recordCategoriesRootNodeHash: 1866538467,
        recordSealsRootNodeHash: 616318467
      },
      privacy: 2
    },
    profileCollectibles: {
      data: {
        recentCollectibleHashes: [
          2687698978, 961181035, 3644093059, 724885343, 178824720, 2131329819, 2180024091, 438937691, 2040028474,
          404495429, 1005930637, 2847042122, 2101299909, 1699119709, 4023168767, 3748686298, 554896099, 2134805892,
          780503768, 369661680, 3110635538, 4237551553, 3550207533, 724885339, 3967122760, 591783285, 3654277922,
          2629609052, 724885338, 1664976690, 1194053061, 3924984788, 3313415273, 3019220289, 4135618735, 16332794
        ],
        collectibles: {},
        collectionCategoriesRootNodeHash: 3790247699,
        collectionBadgesRootNodeHash: 498211331
      },
      privacy: 2
    },
    metrics: {
      data: {
        metrics: {},
        metricsRootNodeHash: 1074663644
      },
      privacy: 2
    },

    ...override
  };
};
