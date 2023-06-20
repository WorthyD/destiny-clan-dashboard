import { MemberProfile } from '@destiny/data/models';
import { PlayerSeal } from './player-seal';
import { DestinyDefinitionsPresentationDestinyPresentationNodeDefinition } from 'bungie-api-angular/lib/model/destinyDefinitionsPresentationDestinyPresentationNodeDefinition';

export function convertSealAndProfile(
  seals: DestinyDefinitionsPresentationDestinyPresentationNodeDefinition[],
  profile: MemberProfile
): PlayerSeal[] {
  return seals.map((seal) => {
   // const record = records.find((r) => r.milestoneHash === seal.completionRecordHash);
    // There should only be one profile here
    //const profile = record.profiles[0];
    const profileRecord = profile?.profileRecords?.data?.records[seal.completionRecordHash]?.objectives[0];

    const completionRecordCount = seal.children.records.length;
    const hasGuilded = profileRecord.completionValue !== completionRecordCount;

    return {
      complete: profileRecord?.complete || false,
      guilded: hasGuilded && completionRecordCount === profileRecord?.progress,
      progress:
        profileRecord?.progress > 0 ? Math.floor((profileRecord?.progress / profileRecord?.completionValue) * 100) : 0,
      sealDescription: seal.displayProperties.description,
      sealImage: seal.displayProperties.icon,
      sealTitle: seal.displayProperties.name
    };
  });
}
