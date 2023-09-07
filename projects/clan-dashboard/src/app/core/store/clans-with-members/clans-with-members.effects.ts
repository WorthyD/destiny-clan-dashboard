import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import * as clanActions from './clans-with-members.actions';
import { filter } from 'rxjs/operators';
import { selectEnabledClans } from '../clans/clans.selectors';
import { updateClan, addClan, removeClan, resetClan, initializeClanItems } from '../clans/clans.actions';
import { ClanMembersService } from '@destiny/data/clan/clan-members';

@Injectable()
export class ClansWithMembersEffects {
  constructor(private actions$: Actions, private store: Store, private memberService: ClanMembersService) {}

  setClansWithMembers = createEffect(() => {
    return this.actions$.pipe(
      ofType(initializeClanItems, updateClan, removeClan, resetClan),
      concatLatestFrom(() => this.store.select(selectEnabledClans)),
      switchMap(([actions, activeClans]) => {
        return from(activeClans).pipe(
          mergeMap((clan) => {
            return this.memberService.getClanMembersCachedSerialized(clan.clanId).pipe(
              map((result) => {
                return { clanId: clan.clanId, clan, members: result };
              }),
              catchError(() => {
                return of(null);
              })
            );
          }),
          filter((x) => !!x),
          toArray(),
          map((result) => {
            return clanActions.setClansWMembers({ clanWithMembers: result });
          })
        );
      })
    );
  });
  setClansWithMembersNew = createEffect(() => {
    return this.actions$.pipe(
      ofType(addClan),
      concatLatestFrom(() => this.store.select(selectEnabledClans)),
      switchMap(([actions, activeClans]) => {
        return from(activeClans).pipe(
          mergeMap((clan) => {
            return this.memberService.getClanMembersSerialized(clan.clanId).pipe(
              map((result) => {
                return { clanId: clan.clanId, clan, members: result };
              }),
              catchError(() => {
                return of(null);
              })
            );
          }),
          filter((x) => !!x),
          toArray(),
          map((result) => {
            return clanActions.setClansWMembers({ clanWithMembers: result });
          })
        );
      })
    );
  });

  // persistSettings$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(
  //         clanActions.addClan,
  //         clanActions.removeClan,
  //         clanActions.setClans,
  //         clanActions.updateClan,
  //         clanActions.resetClan
  //       ),
  //       concatLatestFrom(() => this.store.select(selectClansState)),
  //       tap(([action, clans]) => this.localStorageService.setItem(CLANS_KEY, clans))
  //     );
  //   },
  //   { dispatch: false }
  // );

  // updateLastProfileSync$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(clanActions.updateClanProfileSync),
  //     concatLatestFrom(() => this.store.select(selectClansState)),
  //     map(([action, clans]) => {
  //       const clanToUpdate = clans.entities[action.clanId];
  //       return clanActions.updateClan({ clan: { ...clanToUpdate, profileUpdate: new Date().toString() } });
  //     })
  //   );
  // });

  // updateLastMemberActivitySync$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(clanActions.updateClanMemberActivitySync),
  //     concatLatestFrom(() => this.store.select(selectClansState)),
  //     map(([action, clans]) => {
  //       const clanToUpdate = clans.entities[action.clanId];
  //       return clanActions.updateClan({ clan: { ...clanToUpdate, memberRecentActivityUpdate: new Date().toString() } });
  //     })
  //   );
  // });
  // updateBungieInfoSync$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(clanActions.updateBungieInfoSync),
  //     concatLatestFrom(() => this.store.select(selectClansState)),
  //     map(([action, clans]) => {
  //       const clanToUpdate = clans.entities[action.clanId];
  //       return clanActions.updateClan({ clan: { ...clanToUpdate, bungieInfoUpdate: new Date().toString() } });
  //     })
  //   );
  // });
}
