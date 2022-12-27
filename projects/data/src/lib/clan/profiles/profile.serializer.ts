export function profileSerializer(
  p: any,
  progressionHashes: any[],
  collectionHashes: number[] | string[],
  profileRecords: any[],
  profileMetrics: any[]
) {
  if (!p || !p.profile) {
    return undefined;
  }
  return {
    profile: {
      data: {
        userInfo: {
          membershipType: p.profile.data.userInfo.membershipType,
          membershipId: p.profile.data.userInfo.membershipId,
          displayName: p.profile.data.userInfo.displayName,
          applicableMembershipTypes: p.profile.data.userInfo.applicableMembershipTypes
        },
        dateLastPlayed: p.profile.data.dateLastPlayed,
        characterIds: p.profile.data.characterIds
      }
    },
    profileProgression: {
      data: {
        seasonalArtifact: { ...p.profileProgression?.data?.seasonalArtifact }
      }
    },
    characters: p.characters,
    characterProgressions: {
      data: getCharacterProgressions(p.characterProgressions?.data, progressionHashes)
    },
    profileCollectibles: {
      data: {
        collectibles: getProfileItems(p.profileCollectibles?.data?.collectibles, collectionHashes)
      }
    },
    profileRecords: {
      data: {
        score: p.profileRecords?.data?.score,
        activeScore: p.profileRecords?.data?.activeScore,
        lifetimeScore: p.profileRecords?.data?.lifetimeScore,
        records: getProfileRecords(p.profileRecords?.data?.records, profileRecords)
      }
    },
    metrics: {
      data: {
        metrics: getProfileMetrics(p.metrics?.data?.metrics, profileMetrics)
      }
    }
  };
}

function getCharacterProgressions(data, progressionHashes) {
  const characterProgressions = {};
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      const progressions = {};
      progressionHashes.forEach((ph) => {
        progressions[ph] = getProgressionValues(value['progressions'][ph]);
      });
      characterProgressions[key] = { progressions };
    }
  }
  return characterProgressions;
}
function getProfileRecords(data, profileRecordHashes: number[] | string[]) {
  let profileRecords = {};
  if (data) {
    const progressions = {};
    profileRecordHashes.forEach((ph) => {
      progressions[ph] = data[ph];
    });
    profileRecords = progressions;
  }

  return profileRecords;
}
export function getProfileItems(data, itemHashes: number[] | string[]) {
  let profileRecords = {};
  if (data) {
    const progressions = {};
    itemHashes.forEach((ph) => {
      progressions[ph] = data[ph];
    });
    profileRecords = progressions;
  }

  return profileRecords;
}
function getProfileMetrics(data, profileRecordHashes: number[]) {
  let profileRecords = {};
  if (data) {
    const progressions = {};
    profileRecordHashes.forEach((ph) => {
      progressions[ph] = data[ph];
    });
    profileRecords = progressions;
  }

  return profileRecords;
}

// TODO: Track these somewhere.
function getProgressionValues(prog) {
  return {
    dailyProgress: prog?.dailyProgress,
    weeklyProgress: prog?.weeklyProgress,
    currentProgress: prog?.currentProgress,
    level: prog?.level,
    levelCap: prog?.levelCap,
    progressToNextLevel: prog?.progressToNextLevel,
    nextLevelAt: prog?.nextLevelAt
  };
}
