import { Component, Input, OnInit } from '@angular/core';
import { ClanConfig } from '@core/store/clans';
import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';

@Component({
  selector: 'app-clan-config',
  templateUrl: './clan-config.component.html',
  styleUrls: ['./clan-config.component.scss']
})
export class ClanConfigComponent implements OnInit {
  @Input() clanConfig: ClanConfig;

  constructor(private db: ClanDatabase) {}

  ngOnInit(): void {}

  deleteClanData(){
    this.db.deleteDatabase(this.clanConfig.clanId);
    /*
    window.localStorage.removeItem(`lastActivityUpdate-${x}`)
    window.localStorage.removeItem(`lastActivityAllUpdate-${x}`)
    window.localStorage.removeItem(`MANIFEST_PATH_KEY`)
    window.localStorage.removeItem(`MANIFEST_PATH_EXP_KEY`)
    */
  }
}
