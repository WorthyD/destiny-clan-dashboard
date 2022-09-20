import { Component, OnInit } from '@angular/core';
import { addClan, selectClansStateClans } from '@core/store/clans';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-clan-search',
  templateUrl: './clan-search.component.html',
  styleUrls: ['./clan-search.component.scss']
})
export class ClanSearchComponent {
  constructor(private store: Store) {}

  clans$ = this.store.select(selectClansStateClans);
  addClan(clanId: string) {
    this.store.dispatch(addClan({ clanId }));
  }
}
