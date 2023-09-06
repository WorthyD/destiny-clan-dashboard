import { Injectable, Injector, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, toArray, switchMap, tap, take, filter } from 'rxjs/operators';
import { ClanConfig, selectEnabledClans, updateClanProfileSync } from '../../store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { from, Observable, of } from 'rxjs';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ProfileWorkerService } from '../../../workers/profile-worker/profile-worker.service';
import { nowPlusMinutes } from 'projects/data/src/lib/utility/date-utils';
import { AppConfig } from '@core/config/app-config';
import { ClanConfigMembers } from './clan-updater.service';
import { ClanProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { ClansMembersService } from '../clans-members.service';
import { addNotification, removeNotification, updateNotification } from '../../store/notifications';
import { SeasonService } from '../season.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdaterService {
  profileService: ClanProfileService;
  //clanDB = inject(ClanDatabase);
  constructor(
    private store: Store,
    //private clanMemberService: ClansMembersService,
    private profileWorkerService: ProfileWorkerService,
    private seasonService: SeasonService,
    private appConfig: AppConfig
  ) {
    const clanDB = new ClanDatabase();
    this.profileService = new ClanProfileService(clanDB, appConfig.apiKey);
  }

  profilesUpdate(clans: ClanConfigMembers[]): Observable<ClanConfigMembers[]> {
    return from(clans).pipe(
      // TODO Verify Merge Map is appropriate for this.
      mergeMap((x) => {
        return this.profileUpdate(x).pipe(map((cm) => cm));
      }, 1),
      toArray()
    );
  }

  profileUpdate(clan: ClanConfigMembers): Observable<ClanConfigMembers> {
    const lastUpdate = new Date(clan.clanConfig.profileUpdate || '1/1/1900');
    const staleDate = nowPlusMinutes(-this.appConfig.constants.PROFILE_UPDATING_EXP_MINUTES);

    if (staleDate > lastUpdate) {
      this.store.dispatch(
        addNotification({
          notification: {
            id: 'memberProfile',
            title: `Updating ${clan.clanConfig.clanName} Profiles`,
            data: { progress: 0, complete: 0, total: clan.members.length }
          }
        })
      );
      const progress = (progressCount) => {
        this.store.dispatch(
          updateNotification({
            notification: {
              id: 'memberProfile',
              title: `Updating ${clan.clanConfig.clanName} Profiles`,
              data: {
                progress: progressCount / clan.members.length,
                complete: progressCount,
                total: clan.members.length
              }
            }
          })
        );
      };
      return this.profileWorkerService.loadProfiles(clan.clanConfig.clanId, clan.members, progress).pipe(
        filter((x) => x.length > 0),
        take(1),
        map((x) => {
          // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
          this.store.dispatch(
            removeNotification({
              notification: {
                id: 'memberProfile',
                title: `Updating ${clan.clanConfig.clanName} Profiles`,
                data: { progress: clan.members.length, complete: clan.members.length, total: clan.members.length }
              }
            })
          );

          // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
          this.store.dispatch(updateClanProfileSync({ clanId: clan.clanConfig.clanId }));

          //
          // console.log('------------- dispatch update ------------------');
          // this.clanMemberService.forceReload();
          return {
            ...clan,
            profiles: x
          };
        })
      );
    }

    return this.profileService
      .getSerializedProfilesFromCache(
        clan.clanConfig.clanId,
        clan.members,
        this.seasonService.getSeasonProgressionHashes(),
        [],
        [],
        []
      )
      .pipe(
        map((x) => {
          return { ...clan, profiles: x };
        })
      );
  }
}
