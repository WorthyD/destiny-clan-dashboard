import { Injectable } from '@angular/core';
import { AppState } from '@core/core.state';
import { LocalStorageService } from '@core/services/local-storage.service';
import { ManifestService } from '@core/services/manifest.service';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of, combineLatest, merge } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { setClansWMembersProfiles } from './clans-with-members-profiles.actions';
import { selectClansWithMembersProfilesState } from './clans-with-members-profiles.selectors';
import { tap, withLatestFrom, distinctUntilChanged, filter } from 'rxjs/operators';
import { selectEnabledClans } from '../clans/clans.selectors';
import { updateClan, setClans, addClan, removeClan, resetClan, initializeClanItems } from '../clans/clans.actions';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { selectAllClansWithMembers } from '../clans-with-members/clans-with-members.selectors';
import { setClansWMembers } from '../clans-with-members/clans-with-members.actions';
import { ClanProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { SeasonService } from '@core/services/season.service';

const CLANS_KEY = 'clans';
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
        console.log('stuff', actions);
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
