import { Injectable } from '@angular/core';
import { PresentationNodeDefinitionService } from '@core/definition-services/presentation-node-definition.service';
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
    private clansMembersService: ClansMembersService,
    private profileService: ProfileService
  ) {
    this.milestonesWithProfiles$.subscribe((x) => console.log('sub', x));
  }
  legacySealNode = this.presentationNodeService.definitions[1881970629]; //.getDefinitionsByHash(1881970629);
  currentSealNodes = this.presentationNodeService.definitions[616318467];
  allNodes = this.getNodes(this.currentSealNodes).concat(this.getNodes(this.legacySealNode));

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
          const hashes = this.sealNodes.map((x) => x.completionRecordHash);
          return this.profileService
            .getSerializedProfilesFromCache(clanAndMembers.clan.clanId, clanAndMembers.members, [], hashes)
            .pipe(
              switchMap((memberProfiles) => {
                return clanAndMembers.members.map((member) => {
                  return {
                    clanMember: member,
                    profile: memberProfiles.find((m) => getMemberProfileId(m) === getClanMemberId(member)) as MemberProfile,
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
      return this.sealNodes.map((seal) => {
        return {
          seal: seal,
          totalMembers: cp.length,
          completedCount: this.getCompletionCount(cp, seal.completionRecordHash)
        };
      });
    })
  );

  getSealDetails$(sealHash): Observable<SealClanMember[]> {
    const seal = this.allNodes[sealHash];

    return this.clanProfiles$.pipe(
      map((clanProfiles) => {
        console.log(clanProfiles);
        return clanProfiles.map((clanProfile) => {
          const profileProgression = clanProfile.profile.profileRecords.data.records[sealHash]?.objectives[0];
          return {
            clanMember: clanProfile.clanMember,
            profile: profileSerializer(clanProfile.profile, [], [], []), // Strip records to minimize size of object
            clan: clanProfile.clan,
            sealProgression: {
              isCompleted: profileProgression?.complete,
              completedTriumphCount: profileProgression?.progress || 0,
              totalTriumphCount: profileProgression?.completionValue || 0,
              completionPercentage: profileProgression?.progress > 0
              ? Math.floor((profileProgression?.progress / profileProgression?.completionValue) * 100)
              : 0
            }
          };
        });
      })
    );
    //return of('');
  }

  private getCompletionCount(memberProfiles, completionHash) {
    return memberProfiles.filter((m) => {
      const records = m.profile?.profileRecords?.data?.records[completionHash]?.objectives;

      if (records) {
        //TODO: ?? is this correct?
        return records[0]?.progress === records[0]?.completionValue;
      }
      return false;
    }).length;
  }
}
