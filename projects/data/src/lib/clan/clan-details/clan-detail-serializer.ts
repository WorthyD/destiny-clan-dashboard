import { GroupsV2GroupV2, GroupsV2GroupV2ClanInfoAndInvestment } from 'bungie-api-angular';
import { ClanDetails } from '../../models/ClanDetails';

export function clanDetailSerializer(group: GroupsV2GroupV2, progressionHashes: string[]): ClanDetails {
  return {
    groupId: group?.groupId?.toString() || '',
    name: group.name,
    memberCount: group.memberCount,
    creationDate: group.creationDate as string,
    about: group.about,
    clanInfo: {
      clanCallsign: group.clanInfo.clanCallsign,
      d2ClanProgressions: serializeProgression(group.clanInfo, progressionHashes)
    }
  };
}

function serializeProgression(clanInfo: GroupsV2GroupV2ClanInfoAndInvestment, progressionHashes: string[]) {
  const progression = {};

  progressionHashes.forEach((hash) => {
    progression[hash] = clanInfo.d2ClanProgressions[hash];
  });

  return progression;
}
