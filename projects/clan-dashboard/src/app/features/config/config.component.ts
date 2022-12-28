import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectAllClans } from '@core/store/clans';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  constructor(private store: Store) {}

  clanConfigs$ = this.store.select(selectAllClans);

  async nuke() {
    window.localStorage.clear();

    const dbs = await window.indexedDB.databases();
    dbs.forEach((db) => {
      window.indexedDB.deleteDatabase(db.name);
    });
  }
}
