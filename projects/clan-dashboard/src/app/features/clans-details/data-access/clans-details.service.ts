import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClans } from '@core/store/clans';
import { from, of } from 'rxjs';
import { map, mergeMap, toArray, switchMap } from 'rxjs/operators';
import { ClanDetailsService as DataService } from '@destiny/data/clan/clan-details';
import { ClansDetailsModule } from '../clans-details-shell/clans-details.module';

interface ClanInfo {
  ClanName: string;
  ClanMemberCount: string;
}

@Injectable({
  providedIn: ClansDetailsModule
})
export class ClansDetailsService {
  activeClanIds$ = this.store.select(selectEnabledClans);

  clanInfo$ = this.activeClanIds$.pipe(
    switchMap((clanConfigs) => {
      return from(clanConfigs).pipe(
        mergeMap((clanConfig) => {
          // return of(clanConfig);
          return this.dataService.getClanDetailsSerialized(clanConfig.clanId);
        }),
        toArray()
      );
    })
  );

  constructor(private store: Store, private dataService: DataService) {}
}
