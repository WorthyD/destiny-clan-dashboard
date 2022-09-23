import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClans } from '@core/store/clans';

@Injectable()
export class ClansDetailsService {
  activeClanIds$ = this.store.select(selectEnabledClans);
  constructor(private store: Store) {}
}
