import { Injectable } from '@angular/core';
import { ClanConfig } from '@core/store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { Store } from '@ngrx/store';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import {
  BehaviorSubject,
  combineLatest,
  from,
  map,
  mergeMap,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  toArray
} from 'rxjs';
import {
  selectEnabledClans,
  selectEnabledClanIds,
  selectLastRecentActivityUpdate
} from '../store/clans/clans.selectors';

export interface ClanConfigMembers {
  clan: ClanConfig;
  members: GroupsV2GroupMember[];
}

@Injectable({
  providedIn: 'root'
})
export class ClansMembersService {
  private reloadClanMembers$ = new BehaviorSubject<void>(undefined);

  activeClans$ = this.store.select(selectEnabledClans);

  private _clanMembers$ = this.activeClans$.pipe(
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
      ) as Observable<ClanConfigMembers[]>;
    })
  );

  public clanMembers$ = this.reloadClanMembers$.pipe(
    mergeMap(() => this._clanMembers$),
    shareReplay(1)
  );

  forceReload() {
    // Calling next will complete the current cache instance
    this.reloadClanMembers$.next();
  }

  constructor(
    private store: Store,
    private memberService: ClanMembersService
  ) {}
}
