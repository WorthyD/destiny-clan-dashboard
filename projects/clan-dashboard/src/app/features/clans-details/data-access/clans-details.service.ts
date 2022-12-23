import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClans } from '@core/store/clans';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, toArray, switchMap, tap, startWith } from 'rxjs/operators';
import { ClanDetailsService as DataService } from '@destiny/data/clan/clan-details';
import { ClansDetailsModule } from '../clans-details-shell/clans-details.module';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { ClansMembersService } from '@core/services/clans-members.service';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { getClanMemberId, getMemberProfileId } from '@destiny/data/utility';
import { MemberProfile } from '@destiny/data/models';

interface ClanInfo {
  ClanName: string;
  ClanMemberCount: string;
}

@Injectable({
  providedIn: ClansDetailsModule
})
export class ClansDetailsService {
  activeClans$ = this.store.select(selectEnabledClans);

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

  private clanProfilesLoadingSubject = new BehaviorSubject<boolean>(true);
  clanProfilesLoading$ = this.clanProfilesLoadingSubject.asObservable();
  // TODO: may need to globalize this
  clanProfiles$: Observable<ClanMemberProfile[]> = this.memberService.clanMembers$.pipe(
    tap(() => this.clanProfilesLoadingSubject.next(true)),
    switchMap((clansAndMembers) => {
      console.log('loading');
      return from(clansAndMembers).pipe(
        mergeMap((clanAndMembers) => {
          return this.profileService
            .getSerializedProfilesFromCache(clanAndMembers.clan.clanId, clanAndMembers.members, [], [])
            .pipe(
              switchMap((resultProfiles: MemberProfile[]) => {
                return clanAndMembers.members.map((member) => {
                  return {
                    clan: {
                      clanId: clanAndMembers.clan.clanId,
                      clanName: clanAndMembers.clan.clanName,
                      clanTag: clanAndMembers.clan.clanTag
                    },
                    member,
                    profile: resultProfiles.find((profile) => {
                      return getClanMemberId(member) === getMemberProfileId(profile);
                    })
                  };
                });
              })
            );
        }),
        toArray(),
        tap(() => this.clanProfilesLoadingSubject.next(false))
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

  getClan(clanId: string) {
    return this.dataService.getClanDetailsSerialized(clanId, true);
  }

  constructor(
    private store: Store,
    private dataService: DataService,
    private memberService: ClansMembersService,
    private profileService: ProfileService
  ) {}
}
