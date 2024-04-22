import { Injectable } from '@angular/core';
// import { RecordDefin itionService } from '@core/definition-services/record-definition.service';
import { SeasonService, DefinitionService } from '@dcd/shared/data-access/definitions';
import { ClansMembersService } from '@core/services/clans-members.service';
import { MemberProfile } from '@destiny-clan-dashboard/data/models';
import { getClanMemberId, getMemberProfileId } from '@destiny-clan-dashboard/shared/utils';
import { ClanProfileService } from 'libs/data/src/lib/clan/profiles/profile.service';
import { profileSerializer } from 'libs/data/src/lib/profile/profile.serializer';
import { from, map, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import { GlobalSealsService } from '@dcd/shared/data-access/seals';
import { SealClanMember, SealListItem } from '@dcd/seals/models';

@Injectable({
  providedIn: 'root'
})
export class SealsService {
  constructor(
    private definitionService: DefinitionService,
    // private recordNodeService: RecordDefinitionService,
    private seasonService: SeasonService,
    private clansMembersService: ClansMembersService,
    private profileService: ClanProfileService,
    private globalSeals: GlobalSealsService
  ) {}
  //legacySealNode = this.presentationNodeService.definitions[1881970629]; //.getDefinitionsByHash(1881970629);
  // currentSealNodes = this.definitionService.presentationDefinition[this.appConfig.constants.CURRENT_SEALS_HASH];
  // //allNodes = this.getNodes(this.currentSealNodes).concat(this.getNodes(this.legacySealNode));
  // allNodes = this.getNodes(this.currentSealNodes);

  // sealNodes: DestinyDefinitionsPresentationDestinyPresentationNodeDefinition[] = this.getDefinitionsByHash(
  //   this.allNodes
  // );

  // private getNodes(node) {
  //   return node.children.presentationNodes.map((x) => x.presentationNodeHash);
  // }

  // private getDefinitionsByHash(allNodes: any[]) {
  //   return allNodes.map((h) => {
  //     return this.definitionService.presentationDefinition[h];
  //   });
  // }
  sealNodes = this.globalSeals.sealNodes;

  clanProfiles$ = this.clansMembersService.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          const hashes = this.globalSeals.sealNodes
            .filter((x) => x.completionRecordHash)
            .map((x) => x.completionRecordHash);
          const gildedHashes = [];
          hashes.forEach((hash) => {
            const record = this.definitionService.recordDefinition[hash as number];
            if (record.titleInfo && record.titleInfo.gildingTrackingRecordHash) {
              gildedHashes.push(record.titleInfo.gildingTrackingRecordHash);
            }
          });

          return this.profileService
            .getSerializedProfilesFromCache(
              clanAndMembers.clan.clanId,
              clanAndMembers.members,
              this.seasonService.getSeasonProgressionHashes(),
              [],
              [...hashes, ...gildedHashes],
              []
            )
            .pipe(
              switchMap((memberProfiles) => {
                return clanAndMembers.members.map((member) => {
                  return {
                    clanMember: member,
                    profile: memberProfiles.find(
                      (m) => getMemberProfileId(m) === getClanMemberId(member)
                    ) as MemberProfile,
                    clan: {
                      clanId: clanAndMembers.clan.clanId,
                      clanName: clanAndMembers.clan.clanName,
                      clanTag: clanAndMembers.clan.clanTag
                    }
                  };
                });
              })
            );
        }),
        toArray(),
        map((x) => x.flatMap((y) => y))
      );
    })
  );

  milestonesWithProfiles$: Observable<SealListItem[]> = this.clanProfiles$.pipe(
    map((cp) => {
      return this.globalSeals.sealNodes
        .filter((x) => x.redacted === false)
        .map((seal) => {
          const sealRecord = this.definitionService.recordDefinition[seal.completionRecordHash as number];
          const sealGildingRecord =
            sealRecord && sealRecord.titleInfo && sealRecord.titleInfo.gildingTrackingRecordHash
              ? sealRecord.titleInfo.gildingTrackingRecordHash
              : 0;

          return {
            seal: seal,
            totalMembers: cp.length,
            completedCount: this.getCompletionCount(cp, seal.completionRecordHash),
            gildedCount: this.getCompletionCount(cp, sealGildingRecord),
            isGilded: sealGildingRecord > 0
          };
        });
    })
  );

  getSealDetails$(sealHash): Observable<SealClanMember[]> {
    const sealCompletionHash = this.globalSeals.sealNodes.find((h) => h.hash == sealHash)?.completionRecordHash;
    const sealRecord = this.definitionService.recordDefinition[sealCompletionHash as number];
    const sealGildingRecord =
      sealRecord && sealRecord.titleInfo && sealRecord.titleInfo.gildingTrackingRecordHash
        ? sealRecord.titleInfo.gildingTrackingRecordHash
        : 0;

    return this.clanProfiles$.pipe(
      map((clanProfiles) => {
        return clanProfiles.map((clanProfile) => {
          const profileProgression = clanProfile.profile.profileRecords.data.records[sealCompletionHash]?.objectives[0];
          const gildedProgression =
            sealGildingRecord > 0 ? clanProfile.profile.profileRecords.data.records[sealGildingRecord] : undefined;

          return {
            clanMember: clanProfile.clanMember,
            profile: profileSerializer(clanProfile.profile, [], [], [], []), // Strip records to minimize size of object
            clan: clanProfile.clan,
            sealProgression: {
              isGilded: gildedProgression ? gildedProgression.objectives[0].complete : undefined,
              gildedCount: gildedProgression ? gildedProgression.completedCount : undefined,
              isCompleted: profileProgression?.complete,
              completedTriumphCount: profileProgression?.progress || 0,
              totalTriumphCount: profileProgression?.completionValue || 0,
              completionPercentage:
                profileProgression?.progress > 0
                  ? Math.floor((profileProgression?.progress / profileProgression?.completionValue) * 100)
                  : 0
            }
          };
        });
      })
    );
  }

  private getCompletionCount(memberProfiles, completionHash) {
    return memberProfiles.filter((m) => {
      const records = m.profile?.profileRecords?.data?.records[completionHash]?.objectives[0];

      if (records) {
        return records.complete;
      }
      return false;
    }).length;
  }
  //   private getGildedCount(memberProfiles, gildedHash){
  // return memberProfiles.filter((m) => {
  //       const records = m.profile?.profileRecords?.data?.records[gildedHash]?.objectives[0];

  //       if (records) {
  //         return records.complete;
  //       }
  //       return false;
  //     }).length;

  //   }
}
