import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, toArray, switchMap, tap, take } from 'rxjs/operators';
import { ClanConfig, selectEnabledClans } from '../store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClanUpdaterService {
  activeClanIds$ = this.store.select(selectEnabledClans);

  constructor(private store: Store, private memberService: ClanMembersService) {}

  update() {
    return this.activeClanIds$.pipe(
      tap((x) => console.log('starting')),
      switchMap((activeClans) => {
        return from(activeClans).pipe(
          mergeMap((clanConfig: ClanConfig) => {
            console.log('merge map', clanConfig.clanId);
            return this.memberService.getClanMembersSerialized(clanConfig.clanId).pipe(
              map((members) => ({
                members,
                clanConfig
              }))
            );
          }),
          toArray()
        );
      }),
      tap((x) => console.log('complete', x)),
    );
  }
}
