import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { setClansWMembersProfiles } from './clans-with-members-profiles.actions';
import { selectAllClansWithMembers } from '../clans-with-members/clans-with-members.selectors';
import { setClansWMembers } from '../clans-with-members/clans-with-members.actions';
import { ClanProfileService } from '@dcd/shared/data-access/clan-collections';
import { SeasonService } from '@dcd/shared/data-access/definitions';

@Injectable()
export class ClansWithMembersProfilesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private profileService: ClanProfileService,
    private seasonService: SeasonService
  ) {}

  setClansWithMembersProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(setClansWMembers),
      concatLatestFrom(() => this.store.select(selectAllClansWithMembers)),
      switchMap(([actions, activeClansWithMembers]) => {
        return from(activeClansWithMembers).pipe(
          mergeMap((clanAndMembers) => {
            if (!clanAndMembers.members) {
              return of({
                ...clanAndMembers,
                profiles: []
              });
            }
            return this.profileService
              .getSerializedProfilesFromCache(
                clanAndMembers.clan.clanId,
                clanAndMembers.members,
                this.seasonService.getSeasonProgressionHashes(),
                [],
                [],
                []
              )
              .pipe(
                map((x) => {
                  return {
                    ...clanAndMembers,
                    profiles: x
                  };
                })
              );
          }),
          toArray(),
          map((result) => {
            return setClansWMembersProfiles({ clanWithMembersProfiles: result });
          })
        );
      })
    );
  });
}
