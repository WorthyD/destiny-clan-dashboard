import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClans } from '@core/store/clans';
import { from, of, Subject } from 'rxjs';
import { map, mergeMap, toArray, switchMap, tap } from 'rxjs/operators';
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
  activeClans$ = this.store.select(selectEnabledClans);

  clanInfo$ = this.activeClans$.pipe(
    switchMap((clanConfigs) => {
      return from(clanConfigs).pipe(
        mergeMap((clanConfig) => {
          return this.dataService.getClanDetailsSerialized(clanConfig.clanId, true);
        }),
        toArray()
      );
    })
  );

  getClan(clanId: string) {
    return this.dataService.getClanDetailsSerialized(clanId, true);
  }

  constructor(private store: Store, private dataService: DataService) {}
}
