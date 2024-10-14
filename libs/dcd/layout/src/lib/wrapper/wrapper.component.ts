import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ClanUpdaterService } from '../services/clan-updater.service';
import { AppConfigService } from '@dcd/shared/utils/app-config';
import { getAllNotifications, initializeClanItems } from '@dcd/shared/data-access/store';
import { providePlayerSidebar, PlayerSidebarStore } from '@dcd/player-sidebar/data-access';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  readonly #playerSidebarStore = inject(PlayerSidebarStore);
  constructor(
    private clanUpdaterService: ClanUpdaterService,
    private store: Store,
    private appConfig: AppConfigService
  ) {}
  year = new Date().getFullYear();
  loading: boolean = false;
  showSandbox = !this.appConfig.config.production;
  footerOpen = false;

  notifications$ = this.store.select(getAllNotifications);
  versionNumber = this.appConfig.config.appVersion;

  selectedProfile = this.#playerSidebarStore.selectedProfile;
  selectedLoading = this.#playerSidebarStore.loading;

  ngOnInit(): void {
    this.loading = true;
    this.clanUpdaterService
      .update()
      .pipe(take(1))
      .subscribe((x) => (this.loading = false));

    this.store.dispatch(initializeClanItems());
  //  console.log('selected Profile', this.#playerSidebarStore.selectedProfile().loaded())
  }
  closeSidebar() {
    this.#playerSidebarStore.clear();
  }
}
