import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadManifest, selectManifestState } from '@core/store/manifest';
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
  manifestState$ = this.store.select(selectManifestState).pipe(
    // eslint-disable-next-line @ngrx/avoid-mapping-selectors
    map((x) => x),
    catchError((err) => {
      console.log('error');
      return of(null);
    })
  );

  constructor(private store: Store, iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer, private router: Router) {
    registerIcons(iconRegistry, domSanitizer);

    this.store.dispatch(loadManifest());
  }
  setUpAnalytics() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-174229277-1', {
        page_path: event.urlAfterRedirects
      });
    });
  }
}
