import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadManifest, selectManifestError, selectManifestState } from '@core/store/manifest';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { registerIcons } from '@destiny/components/icons';
import { catchError, filter, map, of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideDisclaimer;
  manifestState$ = this.store.select(selectManifestState).pipe(
    // eslint-disable-next-line @ngrx/avoid-mapping-selectors
    map((x) => x),
    catchError((err) => {
      console.log('error');
      return of(null);
    })
  );
  manifestError$ = this.store.select(selectManifestError);

  constructor(private store: Store, iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer, private router: Router) {
    registerIcons(iconRegistry, domSanitizer);

    this.store.dispatch(loadManifest());
    this.setUpAnalytics();
  }
  setUpAnalytics() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      gtag('config', 'G-FCTYCE6GLS', {
        page_path: event.urlAfterRedirects
      });
    });
  }
}
