import { Injectable } from '@angular/core';
// import { ActivityDefinitionService } from '@core/definition-services/activity-definition.service';
import { DefinitionService } from '@core/definition-services/definition.service';
import { ClansMembersService } from '@core/services/clans-members.service';
import { SeasonService } from '@core/services/season.service';
import {
  selectAllClansMembersProfiles,
  selectClanMemberProfileStateLoading
} from '@core/store/clans-members-profiles/clan-members-profiles.selectors';
import { getClanMemberId, getMemberProfileId } from '@destiny-clan-dashboard/data/utility';
import { Store } from '@ngrx/store';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { ClanProfileService } from 'libs/data/src/lib/clan/profiles/profile.service';
import { from, map, mergeMap, Observable, switchMap, take, toArray } from 'rxjs';
import { ActivitiesShellModule } from '../activities-shell/activities-shell.module';
import {
  CuratedActivityGroupDefinitions,
  CURATED_ACTIVITIES_ALL,
  CURATED_ACTIVITY_GROUPS
} from '../models/CuratedActivities';
import { ProfileRecentActivityWorkerService } from '../../../workers/profile-recent-activity/profile-recent-activity.service';

@Injectable({
  providedIn: ActivitiesShellModule
})
export class ActivitiesService {
  constructor(
    //private activityDefinitionService: ActivityDefinitionService,
    private definitionService: DefinitionService,
    private store: Store,
    private memberService: ClansMembersService,
    private profileService: ClanProfileService,
    private seasonService: SeasonService,
    private profileRecentActivityWorkerService: ProfileRecentActivityWorkerService
  ) {}

  getCuratedActivities(): CuratedActivityGroupDefinitions[] {
    const groups = CURATED_ACTIVITY_GROUPS;

    return groups.map((group) => {
      return {
        title: group.title,
        activities: group.activities.map((ca) => this.definitionService.activityDefinition[ca.hash])
      };
    });
  }

  getActivityById(hash: number) {
    return this.definitionService.activityDefinition[hash];
  }

  getCuratedMetrics(hash: number): any[] {
    const curatedMetrics = CURATED_ACTIVITIES_ALL.find((ca) => ca.hash === hash).metrics || [];

    return curatedMetrics.map((cm) => this.definitionService.metricDefinitions[cm]);
  }

  getCuratedCollections(hash: number): any[] {
    const curatedCollections = CURATED_ACTIVITIES_ALL.find((ca) => ca.hash === hash).collections || [];
    return curatedCollections.map((cm) => this.definitionService.collectibleDefinition[cm]);
  }
  getCuratedRecords(hash: number): any[] {
    const curatedRecords = CURATED_ACTIVITIES_ALL.find((ca) => ca.hash === hash).records || [];
    return curatedRecords.map((cm) => this.definitionService.recordDefinition[cm]);
  }

  clanProfiles$: Observable<ClanMemberProfile[]> = this.store.select(selectAllClansMembersProfiles); //.pipe(
  clanProfilesLoading$: Observable<boolean> = this.store.select(selectClanMemberProfileStateLoading); //

  getProfiles(
    metricHashes: number[],
    collectionHashes: number[],
    recordHashes: number[]
  ): Observable<ClanMemberProfile[]> {
    return this.memberService.clanMembers$.pipe(
      switchMap((clansAndMembers) => {
        return from(clansAndMembers).pipe(
          mergeMap((clanAndMembers) => {
            return this.profileService
              .getSerializedProfilesFromCache(
                clanAndMembers.clan.clanId,
                clanAndMembers.members,
                this.seasonService.getSeasonProgressionHashes(),
                collectionHashes,
                recordHashes,
                metricHashes
              )
              .pipe(
                switchMap((memberProfiles) => {
                  return clanAndMembers.members.map((member) => {
                    return {
                      member,
                      profile: memberProfiles.find((m) => getMemberProfileId(m) === getClanMemberId(member)),
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
  }

  getActivityStatsByHash(hash: number): Observable<any> {
    return this.memberService.clanMembersProfiles$.pipe(
      switchMap((clanMembersProfiles) => {
        return this.profileRecentActivityWorkerService.getAllActivities(clanMembersProfiles, 'daily', 0, hash);
      })
    );
  }
}