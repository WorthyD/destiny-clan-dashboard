import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  mergeMap,
  map,
  catchError,
  toArray,
  switchMap,
  tap,
  take,
  filter,
  distinctUntilChanged,
  concatMap
} from 'rxjs/operators';
import { ClanConfig, selectEnabledClans, updateClan, updateClanProfileSync } from '../../store/clans';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { from, Observable, of } from 'rxjs';
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
  showLog = true;

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private profileWorkerService: ProfileWorkerService,
    private appConfig: AppConfig,
    private clanDetailsService: ClanDetailsService,
    private profileUpdaterService: ProfileUpdaterService,
    private memberActivityUpdaterService: MemberActivityUpdaterService,
    private bungieInfoUpdaterService: BungieInfoUpdaterService,
    public dialog: MatDialog
  ) {}

  update() {
    return this.activeClanIds$.pipe(
      take(1),
      tap((x) => this.showLog && console.log('Starting Updater', x)),
      switchMap((activeClans) => this.clanUpdate(activeClans)),
      tap((x) => this.showLog && console.log('Starting Member Updater', x)),
      switchMap((activeClans) => this.memberUpdate(activeClans)),
      tap((x) => this.showLog && console.log('Member Update Complete', x)),
      switchMap((clans) => this.profileUpdaterService.profilesUpdate(clans)),
      tap((x) => this.showLog && console.log('Member Profile Update Complete', x)),
      switchMap((clans) => this.memberActivityUpdaterService.membersActivityUpdate(clans)),
      tap((x) => this.showLog && console.log('Member Recent Activity Update Complete', x)),
      switchMap((clans) => this.bungieInfoUpdaterService.updateAllClansBungieInfo(clans)),
      tap((x) => this.showLog && console.log('Bungie Info Update Complete', x))
    );
  }

  clanUpdate(activeClans) {
    return from(activeClans).pipe(
      // TODO: Double check concat map
      mergeMap((clanConfig: ClanConfig) => {
        //console.log('update', clanConfig);
        //concatMap((clanConfig: ClanConfig) => {
        return this.clanDetailsService.getClanDetailsSerialized(clanConfig.clanId, false).pipe(
          map((result) => {
            //console.log('got clan');
            const newConfig = {
              ...clanConfig,
              clanName: result.name,
              clanTag: result.clanInfo.clanCallsign
            };
            this.store.dispatch(updateClan({ clan: newConfig }));

            return newConfig;
          })
        );
      }, 1),

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
