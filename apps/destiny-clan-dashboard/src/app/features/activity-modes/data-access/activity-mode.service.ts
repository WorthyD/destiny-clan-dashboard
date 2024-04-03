import { ActivityModeShellModule } from '../activity-mode-shell/activity-mode-shell.module';
import { DESTINY_ACTIVITY_MODES } from '@destiny-clan-dashboard/data/models';
import { DefinitionService } from '@dcd/shared/data-access/definitions';
import { Injectable } from '@angular/core';
import { ClansMembersService } from '@core/services/clans-members.service';
import { of, switchMap } from 'rxjs';
import { ProfileRecentActivityWorkerService } from '../../../workers/profile-recent-activity/profile-recent-activity.service';
import { DestinyDefinitionsDestinyActivityModeDefinition } from 'bungie-api-angular';
import { TrackedDuration } from 'libs/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.serializer';
@Injectable({
  providedIn: ActivityModeShellModule
})
export class ActivityModeService {
  constructor(
    private definitionService: DefinitionService,
    private clansDetailsService: ClansMembersService,
    private profileRecentActivityWorkerService: ProfileRecentActivityWorkerService
  ) {}
  readonly ignoredModes = [
    16, // NFStrikes - no stats
    66, // Forges
    17, // Prestiege NF
    58, // Heroic adv
    47, // Scored Pres NF
    77, // Menagerie
    78, // Vex offensive
    83, // SUndial
    76, // Reckoning
    72, // Clash comp
    74, // Control comp,
    67, // Salvage
    42, // Trials 9 survival
    15, // crimson doubles
    39, // Trials of nine
    38, // Countdown
    49, // Doubles
    41, // Trials 9 count
    50, // Doubles
    31, // Supremecy.
    68, // IB Salvage
    43, // IB Control
    44, // IB control
    45, // IB Supremacy
    90, // IB Rift
    61, // Scorched
    60, // Lockdown
    65, // Break through
    80, // Elimination
    89, // Zone control
    75 // GB Prime
  ];

  getActivityModeDefinition(modeType: number) {
    const x = Object.keys(this.definitionService.activityModeDefinition).map(
      (x) => this.definitionService.activityModeDefinition[x]
    ) as DestinyDefinitionsDestinyActivityModeDefinition[];
    return x.find((y) => y.modeType === modeType);
  }

  getGroupedActivityModes() {
    const groups = DESTINY_ACTIVITY_MODES;
    const definitions = Object.keys(this.definitionService.activityModeDefinition).map(
      (x) => this.definitionService.activityModeDefinition[x]
    );
    return groups.map((x) => {
      return {
        group: x,
        activities: definitions
          .filter(
            (mode) =>
              mode.activityModeCategory === x.id &&
              mode.redacted === false &&
              mode.blacklisted === false &&
              mode.display === true &&
              this.ignoredModes.indexOf(mode.modeType) === -1
          )
          .sort((a, b) => a.order - b.order)
      };
    });
  }

  getAllActivitiesByMode(mode: number, trackedDates: TrackedDuration[]) {
    return this.clansDetailsService.clanMembersProfiles$.pipe(
      switchMap((clanMembersProfiles) => {
        return this.profileRecentActivityWorkerService.getAllRecentClanActivitiesByActivityModeId(
          clanMembersProfiles,
          trackedDates,
          mode,
          0
        );
        return of(clanMembersProfiles);
      })
    );
  }
}
