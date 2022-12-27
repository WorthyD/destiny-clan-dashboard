import { Injectable } from '@angular/core';
import { AppConfig } from '@core/config/app-config';
import { PresentationNodeDefinitionService } from '@core/definition-services/presentation-node-definition.service';
import { RecordDefinitionService } from '@core/definition-services/record-definition.service';
import { ClansMembersService } from '@core/services/clans-members.service';
import { MemberProfile } from '@destiny/data/models';
import { getClanMemberId, getMemberProfileId } from '@destiny/data/utility';
import { profileSerializer } from 'projects/data/src/lib/clan/profiles/profile.serializer';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { from, map, mergeMap, Observable, of, switchMap, toArray } from 'rxjs';
import { SealClanMember } from '../models/seal-clan-member';
import { SealListItem } from '../models/seal-list-item';
import { SealsModule } from '../seals-shell/seals.module';

@Injectable({
  providedIn: 'root'
})
export class SealsService {
  constructor(
    private presentationNodeService: PresentationNodeDefinitionService,
    private recordNodeService: RecordDefinitionService,
    private clansMembersService: ClansMembersService,
    private profileService: ProfileService,
    private appConfig: AppConfig
  ) {
  }
  //legacySealNode = this.presentationNodeService.definitions[1881970629]; //.getDefinitionsByHash(1881970629);
  currentSealNodes = this.presentationNodeService.definitions[this.appConfig.constants.CURRENT_SEALS_HASH];
  //allNodes = this.getNodes(this.currentSealNodes).concat(this.getNodes(this.legacySealNode));
  allNodes = this.getNodes(this.currentSealNodes);

  sealNodes = this.getDefinitionsByHash(this.allNodes);

  private getNodes(node) {
    return node.children.presentationNodes.map((x) => x.presentationNodeHash);
  }

  private getDefinitionsByHash(allNodes: any[]) {
    return allNodes.map((h) => {
      return this.presentationNodeService.definitions[h];
    });
  }

  clanProfiles$ = this.clansMembersService.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          const hashes = this.sealNodes.filter((x) => x.completionRecordHash).map((x) => x.completionRecordHash);
          const gildedHashes = [];
          hashes.forEach((hash) => {
            const record = this.recordNodeService.definitions[hash as number];
            if (record.titleInfo && record.titleInfo.gildingTrackingRecordHash) {
              gildedHashes.push(record.titleInfo.gildingTrackingRecordHash);
            }
          });

          return this.profileService
            .getSerializedProfilesFromCache(
              clanAndMembers.clan.clanId,
              clanAndMembers.members,
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
      return this.sealNodes
        .filter((x) => x.redacted === false)
        .map((seal) => {
          const sealRecord = this.recordNodeService.definitions[seal.completionRecordHash as number];
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
    const sealCompletionHash = this.sealNodes.find((h) => h.hash == sealHash)?.completionRecordHash;
    const sealRecord = this.recordNodeService.definitions[sealCompletionHash as number];
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
