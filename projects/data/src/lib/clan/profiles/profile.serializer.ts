
export function profileSerializer(p: any, progressionHashes: any[]) {
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
