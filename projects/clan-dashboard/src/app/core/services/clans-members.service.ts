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
  private cache$: Observable<Array<ClanConfigMembers>>;
  // private reloadClanMembers$ = new Subject<void>();
  private reloadClanMembers$ = new BehaviorSubject<void>(undefined);

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

  // get clanMembers$() {
  //   if (!this.cache$) {
  //     console.log('cache not found');
  //     this.cache$ = this._clanMembers$.pipe(takeUntil(this.reloadClanMembers$), shareReplay(1));
  //   }
  //   console.log('cache  found');
  //   return this.cache$;
  // }

  public clanMembers$ = this.reloadClanMembers$.pipe(
    //tap(() => console.log('premege')),
    mergeMap(() => this._clanMembers$),
    shareReplay(1),
    //tap(() => console.log('replay'))
  );

  forceReload() {
    // Calling next will complete the current cache instance
    //console.log('resetting cache');
    this.reloadClanMembers$.next();

    //this.cache$ = null;
  }

  constructor(
    private store: Store,
    private memberService: ClanMembersService // private profileService: ProfileService,
  ) {}
}
