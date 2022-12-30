import { Component, OnInit } from '@angular/core';
import { getAllNotifications } from '@core/store/notifications';
import { select, Store } from '@ngrx/store';
import { of, take } from 'rxjs';
import { ClanUpdaterService } from '../../services/updaters/clan-updater.service';
import { AppConfig } from '../../config/app-config';
import { initializeClanMemberProfiles } from '@core/store/clans-members-profiles/clan-members-profiles.actions';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  constructor(private clanUpdaterService: ClanUpdaterService, private store: Store, private appConfig: AppConfig) {}
  loading: boolean = false;
  showSandbox = !this.appConfig.production;

  notifications$ = this.store.select(getAllNotifications);

  ngOnInit(): void {
    this.loading = true;
    this.clanUpdaterService
      .update()
      .pipe(take(1))
      .subscribe((x) => (this.loading = false));

    this.store.dispatch(initializeClanMemberProfiles());
  }
}
