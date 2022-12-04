import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, toArray, switchMap, tap, take, filter, distinctUntilChanged } from 'rxjs/operators';
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
    private memberActivityUpdaterService: MemberActivityUpdaterService
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
      tap((x) => this.showLog && console.log('Member Recent Activity Update Complete', x))
    );
  }

  clanUpdate(activeClans) {
    return from(activeClans).pipe(
      mergeMap((clanConfig: ClanConfig) => {
        return this.clanDetailsService.getClanDetailsSerialized(clanConfig.clanId).pipe(
          map((result) => {
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
      toArray()
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
