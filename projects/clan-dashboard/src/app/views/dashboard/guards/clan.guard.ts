import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { getTotalClans } from '@core/store/clans/clans.selectors';

@Injectable({
  providedIn: 'root'
})
export class ClanResolveGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(getTotalClans).pipe(
      map((clans) => {
        if (!clans || clans === 0) {
          return this.router.parseUrl('/clan-search');
        }
        return true;
      })
    );
  }
}
