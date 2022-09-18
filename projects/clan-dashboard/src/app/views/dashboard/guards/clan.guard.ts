import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClanResolveGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('stuff', route.params);
    // if (membershipType && membershipId && characterId) {
    //   this.store.dispatch(loadClanMembers({ info: { membershipType, membershipId, characterId } }));
    //   return of(true);
    // }
    // return of(false);
    console.log('guard');
    return this.router.parseUrl('/clan-search');
   //  return of(true);
  }
}
