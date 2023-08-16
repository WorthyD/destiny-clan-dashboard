import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, toArray, switchMap, tap, take, filter } from 'rxjs/operators';
import { ClanConfig, removeClan, selectEnabledClans, updateClan, updateClanProfileSync } from '../../store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { from, of } from 'rxjs';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ProfileWorkerService } from '../../../workers/profile-worker/profile-worker.service';
import { nowPlusMinutes } from 'projects/data/src/lib/utility/date-utils';
import { AppConfig } from '@core/config/app-config';
import { ProfileUpdaterService } from './profile-updater.service';
import { MemberActivityUpdaterService } from './member-activity-updater.service';
import { ClanDetailsService } from '@destiny/data/clan/clan-details';
import { MatDialog } from '@angular/material/dialog';
import { AppOfflineDialogComponent } from '../../layout/app-offline-dialog/app-offline-dialog.component';
import { BungieInfoUpdaterService } from './bungie-info-updater.service';
import { isMobile } from '../../utilities/is-mobile';
import { environment } from 'projects/clan-dashboard/src/environments/environment';

export interface ClanConfigMembers {
  clanConfig: ClanConfig;
  members: GroupsV2GroupMember[];
  profiles?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ClanUpdaterService {
  activeClanIds$ = this.store.select(selectEnabledClans);
  showLog = environment.production === false;

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private appConfig: AppConfig,
    private clanDetailsService: ClanDetailsService,
    private profileUpdaterService: ProfileUpdaterService,
    private memberActivityUpdaterService: MemberActivityUpdaterService,
    private bungieInfoUpdaterService: BungieInfoUpdaterService,
    public dialog: MatDialog
  ) {}
  clanUpdaterKey = 'clanUpdaterKey';
  clanMemberUpdater = 'clanMemberUpdater';
  profileUpdater = 'profileUpdater';
  recentActivityUpdater = 'recentActivityUpdater';
  updateAllClansBungieInfo = 'updateAllClansBungieInfo';

  update() {
    return this.activeClanIds$.pipe(
      take(1),
      tap((x) => this.showLog && this.tapFunc('Starting Updater', x, this.clanUpdaterKey)),
      switchMap((activeClans) => this.clanUpdate(activeClans)),
      tap(
        (x) => this.showLog && this.tapFunc('Starting Member Updater', x, this.clanMemberUpdater, this.clanUpdaterKey)
      ),
      switchMap((activeClans) => this.memberUpdate(activeClans)),
      tap(
        (x) => this.showLog && this.tapFunc('Member Update Complete', x, this.profileUpdater, this.clanMemberUpdater)
      ),
      switchMap((clans) => this.profileUpdaterService.profilesUpdate(clans)),
      tap(
        (x) =>
          this.showLog &&
          this.tapFunc('Member Profile Update Complete', x, this.recentActivityUpdater, this.profileUpdater)
      ),
      switchMap((clans) => (isMobile() ? of(clans) : this.memberActivityUpdaterService.membersActivityUpdate(clans))),
      tap(
        (x) =>
          this.showLog &&
          this.tapFunc(
            'Member Recent Activity Update Complete',
            x,
            this.updateAllClansBungieInfo,
            this.recentActivityUpdater
          )
      ),
      switchMap((clans) => (isMobile() ? of(clans) : this.bungieInfoUpdaterService.updateAllClansBungieInfo(clans))),
      tap(
        (x) => this.showLog && this.tapFunc('Bungie Info Update Complete', x, undefined, this.updateAllClansBungieInfo)
      )
    );
  }

  tapFunc(msg, data, logKey = undefined, lastLogKey = undefined) {
    console.log(msg, data);
    if (logKey) {
      console.time(logKey);
    }
    if (lastLogKey) {
      console.timeEnd(lastLogKey);
    }
  }

  clanUpdate(activeClans) {
    return from(activeClans).pipe(
      // TODO: Double check concat map
      mergeMap((clanConfig: ClanConfig) => {
        return this.clanDetailsService.getClanDetailsSerialized(clanConfig.clanId, false).pipe(
          map((result) => {
            const newConfig = {
              ...clanConfig,
              clanName: result.name,
              clanTag: result.clanInfo.clanCallsign
            };
            this.store.dispatch(updateClan({ clan: newConfig }));

            return newConfig;
          }),
          catchError((error) => {
            if (error.error.ErrorStatus === 'ClanNotFound') {
              this.store.dispatch(removeClan({ clanId: clanConfig.clanId }));
            }
            //throw Error(error);
            return of(undefined);
          })
        );
      }, 1),
      filter((x) => !!x),
      toArray(),
      catchError((err) => {
        if (err.message === 'System Offline') {
          const acknowledgeOffline = window.sessionStorage.getItem(
            this.appConfig.constants.D2DASHBOARD_ACKNOWLEDGE_OFFLINE
          );
          if (!acknowledgeOffline) {
            this.dialog.open(AppOfflineDialogComponent);
          }
        }
        throw err;
      })
    );
  }

  memberUpdate(activeClans) {
    return from(activeClans).pipe(
      mergeMap((clanConfig: ClanConfig) => {
       // console.log('----------memberUpdate ------------', clanConfig.clanId);
        return this.memberService.getClanMembersSerialized(clanConfig.clanId).pipe(
          map((members) => ({
            members,
            clanConfig
          }))
        );
      }, 1),
      toArray()
    );
  }
}
