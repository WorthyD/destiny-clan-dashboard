import { Injectable } from '@angular/core';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { Store } from '@ngrx/store';
import { combineLatest, from, map, mergeMap, Observable, switchMap, take, tap, toArray } from 'rxjs';
import {
  selectEnabledClans,
  selectEnabledClanIds,
  selectLastRecentActivityUpdate
} from '../store/clans/clans.selectors';

@Injectable({
  providedIn: 'root'
})
export class ClansMembersService {
  activeClans$ = this.store.select(selectEnabledClans);
  activeClansId$ = this.store.select(selectEnabledClanIds);
  activeClanUpdateDates$: Observable<string[]> = this.activeClans$.pipe(
    switchMap((clans) => {
      const arraySelectors = clans.map((clan) => {
        return this.store.select(selectLastRecentActivityUpdate(clan.clanId));
      });

      return combineLatest(arraySelectors);
    })
  );

  clanMembers$ = this.activeClans$.pipe(
    switchMap((activeClans) => {
      return from(activeClans).pipe(
        mergeMap((clan) => {
          return this.memberService.getClanMembersSerialized(clan.clanId).pipe(
            map((result) => {
              return { clan, members: result };
            })
          );
        }),
        toArray()
      );
    })
  );

  constructor(
    private store: Store,
    private memberService: ClanMembersService // private profileService: ProfileService,
  ) {}
}
