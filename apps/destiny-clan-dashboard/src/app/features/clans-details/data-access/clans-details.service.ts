import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClans } from '@core/store/clans';
import {
  selectAllClansMembersProfiles,
  selectClanMemberProfileStateLoading
} from '@core/store/clans-members-profiles/clan-members-profiles.selectors';
import { from, Observable } from 'rxjs';
import { map, mergeMap, toArray, switchMap } from 'rxjs/operators';
import { ClanDetailsService as DataService } from '@destiny-clan-dashboard/data/clan/clan-details';
import { ClansDetailsModule } from '../clans-details-shell/clans-details.module';
import { ClanMemberProfile, ClanMemberProfileWSeason } from '@shared/models/ClanMemberProfile';
import { SeasonService } from '@core/services/season.service';

@Injectable({
  providedIn: ClansDetailsModule
})
export class ClansDetailsService {
  activeClans$ = this.store.select(selectEnabledClans);

  clanProfilesLoading$ = this.store.select(selectClanMemberProfileStateLoading);
  clanProfiles$ = this.store.select(selectAllClansMembersProfiles);

  clanInfo$ = this.activeClans$.pipe(
    switchMap((clanConfigs) => {
      return from(clanConfigs).pipe(
        mergeMap((clanConfig) => {
          return this.dataService.getClanDetailsSerialized(clanConfig.clanId, true);
        }),
        toArray()
      );
    })
  );

  highestPowerBonusMembers$: Observable<ClanMemberProfile[]> = this.clanProfiles$.pipe(
    map((members) => {
      if (members.length > 0) {
        const sortedMembers = members.sort((a, b) => {
          return (a.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus ?? 0) >
            (b.profile?.profileProgression?.data?.seasonalArtifact?.powerBonus ?? 0)
            ? -1
            : 1;
        });
        return sortedMembers.slice(0, 20);
      }
      return [];
    })
  );

  highestSeasonPassMembers$: Observable<ClanMemberProfileWSeason[]> = this.clanProfiles$.pipe(
    map((members) => {
      if (members.length > 0) {
        const currentSeason = this.seasonService.currentSeasonProgress;
        const membersWithSeasonProgression = members.map((m) => {
          if (m.profile) {
            const characterId = m.profile.profile.data.characterIds[0];
            const progressions = m.profile?.characterProgressions?.data[characterId]?.progressions || {};
            return {
              ...m,
              seasonPass:
                (progressions[currentSeason.rewardProgressionHash]?.level || 0) +
                (progressions[currentSeason.prestigeProgressionHash]?.level || 0)
            };
          }
          return { ...m, seasonPass: 0 };
        });
        const sortedMembersWithProgression = membersWithSeasonProgression.sort((a, b) => {
          return a.seasonPass > b.seasonPass ? -1 : 1;
        });
        return sortedMembersWithProgression.slice(0, 20);
      }

      return [];
    })
  );

  lastLoginMembers$: Observable<ClanMemberProfile[]> = this.clanProfiles$.pipe(
    map((members) => {
      // console.log('last login members', members);
      if (members.length > 0) {
        const sortedMembers = members.sort((a, b) => {
          return a.profile?.profile.data.dateLastPlayed > b.profile?.profile.data.dateLastPlayed ? -1 : 1;
        });
        return sortedMembers.slice(0, 20);
      }
      return [];
    })
  );
  inactiveMemberList$ = this.clanProfiles$.pipe(
    map((members) => {
      if (members.length > 0) {
        const sortedMembers = members.sort((a, b) => {
          return a.profile?.profile.data.dateLastPlayed > b.profile?.profile.data.dateLastPlayed ? 1 : -1;
        });
        return sortedMembers.slice(0, 20);
      }
      return [];
    })
  );

  getClan(clanId: string) {
    return this.dataService.getClanDetailsSerialized(clanId, true);
  }

  constructor(private store: Store, private dataService: DataService, private seasonService: SeasonService) {}
}