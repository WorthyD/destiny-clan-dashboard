import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadManifest, selectManifestError, selectManifestState } from '@dcd/shared/data-access/store';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { registerIcons } from '@destiny-clan-dashboard/components/icons';
import { catchError, filter, map, of } from 'rxjs';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@dcd/layout';

declare let gtag: Function;

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    //CoreModule,
    LayoutModule,
    MatProgressSpinnerModule
  ],
  selector: 'destiny-clan-dashboard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'destiny-clan-dashboard';
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
