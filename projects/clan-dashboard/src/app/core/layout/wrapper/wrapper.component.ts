import { Component, OnInit } from '@angular/core';
import { getAllNotifications } from '@core/store/notifications';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ClanUpdaterService } from '../../services/updaters/clan-updater.service';
import { AppConfig } from '../../config/app-config';
import { initializeClanItems } from '@core/store/clans';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  constructor(private clanUpdaterService: ClanUpdaterService, private store: Store, private appConfig: AppConfig) {}
  year = new Date().getFullYear();
  loading: boolean = false;
  showSandbox = !this.appConfig.production;
  footerOpen = false;

  notifications$ = this.store.select(getAllNotifications);
  versionNumber = this.appConfig.appVersion;
  ngOnInit(): void {
    this.loading = true;
    this.clanUpdaterService
      .update()
      .pipe(take(1))
      .subscribe((x) => (this.loading = false));

    this.store.dispatch(initializeClanItems());
  }
}
