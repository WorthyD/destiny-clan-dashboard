import { Injectable } from '@angular/core';
import { ActivityDefinitionService } from '@core/definition-services/activity-definition.service';
import { DefinitionService } from '@core/definition-services/definition.service';
import { ClansMembersService } from '@core/services/clans-members.service';
import {
  selectAllClansMembersProfiles,
  selectClanMemberProfileStateLoading
} from '@core/store/clans-members-profiles/clan-members-profiles.selectors';
import { getClanMemberId, getMemberProfileId } from '@destiny/data/utility';
import { Store } from '@ngrx/store';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { DestinyDefinitionsDestinyActivityDefinition } from 'bungie-api-angular';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { from, map, mergeMap, Observable, switchMap, take, toArray } from 'rxjs';
import { ActivitiesShellModule } from '../activities-shell/activities-shell.module';
import { CURATED_ACTIVITIES } from '../models/CuratedActivities';

@Injectable({
  providedIn: ActivitiesShellModule
})
export class ActivitiesService {
  constructor(
    private activityDefinitionService: ActivityDefinitionService,
    private definitionService: DefinitionService,
    private store: Store,
    private memberService: ClansMembersService,
    private profileService: ProfileService
  ) {}

  getCuratedActivities(): DestinyDefinitionsDestinyActivityDefinition[] {
    const curatedActivityHashes = CURATED_ACTIVITIES.map((ca) => ca.hash);
    return curatedActivityHashes.map((ca) => this.activityDefinitionService.definitions[ca]);
  }

  getActivityById(hash: number) {
    return this.activityDefinitionService.definitions[hash];
  }

  getCuratedMetrics(hash: number): any[] {
    const curatedMetrics = CURATED_ACTIVITIES.find((ca) => ca.hash === hash).metrics || [];

    return curatedMetrics.map((cm) => this.definitionService.metricDefinitions[cm]);
  }
  clanProfiles$: Observable<ClanMemberProfile[]> = this.store.select(selectAllClansMembersProfiles); //.pipe(
  clanProfilesLoading$: Observable<boolean> = this.store.select(selectClanMemberProfileStateLoading); //

  getProfiles(metricHashes: number[]): Observable<ClanMemberProfile[]> {
    return this.memberService.clanMembers$.pipe(
      switchMap((clansAndMembers) => {
        return from(clansAndMembers).pipe(
          mergeMap((clanAndMembers) => {
            return this.profileService
              .getSerializedProfilesFromCache(clanAndMembers.clan.clanId, clanAndMembers.members, [], [], metricHashes)
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
}
