import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppState } from '@core/core.state';
import { loadManifest, selectManifestState } from '@core/store/manifest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clan-dashboard';
  test = ''; // environment.apiKey;

  manifestState$ = this.store.select(selectManifestState);

  constructor(private store: Store) {
    this.store.dispatch(loadManifest());
  }
}
