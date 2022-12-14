import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppState } from '@core/core.state';
import { loadManifest, selectManifestState } from '@core/store/manifest';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { registerIcons } from '@destiny/components/icons';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clan-dashboard';
  test = ''; // environment.apiKey;

  manifestState$ = this.store.select(selectManifestState).pipe(
    // eslint-disable-next-line @ngrx/avoid-mapping-selectors
    map((x) => x),
    catchError((err) => {
      console.log('error');
      return of(null);
    })
  );

  constructor(private store: Store, iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    registerIcons(iconRegistry, domSanitizer);

    this.store.dispatch(loadManifest());
  }
}
