import { Component, Input, OnInit } from '@angular/core';
import { ClanConfig } from '@core/store/clans';
import { Store } from '@ngrx/store';
import { ClanDatabase } from 'libs/data/src/lib/clan/clan-database';

import { removeClan } from '@core/store/clans/clans.actions';

@Component({
  selector: 'app-clan-config',
  templateUrl: './clan-config.component.html',
  styleUrls: ['./clan-config.component.scss']
})
export class ClanConfigComponent {
  @Input() clanConfig: ClanConfig;

  constructor(private db: ClanDatabase, private store: Store) {}

  deleteClanData() {
    this.store.dispatch(removeClan({ clanId: this.clanConfig.clanId }));
    this.db.purgeDatabase(this.clanConfig.clanId);
     /*
    window.localStorage.removeItem(`lastActivityUpdate-${x}`)
    window.localStorage.removeItem(`lastActivityAllUpdate-${x}`)
    window.localStorage.removeItem(`MANIFEST_PATH_KEY`)
    window.localStorage.removeItem(`MANIFEST_PATH_EXP_KEY`)
    */
  }
}
