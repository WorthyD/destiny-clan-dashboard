import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { selectTotalClans } from '@core/store/clans/clans.selectors';

@Injectable({
  providedIn: 'root'
})
export class ClanResolveGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectTotalClans).pipe(
      map((clans) => {
        if (!clans || clans === 0) {
          return this.router.parseUrl('/home');
        }
        return true;
      })
    );
  }
}
