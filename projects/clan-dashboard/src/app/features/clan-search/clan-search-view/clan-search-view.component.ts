import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GroupsV2GroupV2Card } from 'bungie-api-angular/lib/model/groupsV2GroupV2Card';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { ClanSearchService } from '../data-access/clan-search.service';

@Component({
  selector: 'app-clan-search-view',
  templateUrl: './clan-search-view.component.html',
  styleUrls: ['./clan-search-view.component.scss']
})
export class ClanSearchViewComponent {
  constructor(private clanSearchService: ClanSearchService) {}

  clans$ = this.clanSearchService.clans$;

  bgClass = `bg-${Math.floor(Math.random() * 3) + 1}`;
  loading = false;
  autoCompleteResults$: Observable<any>;

  searchClans(search: any) {
    this.autoCompleteResults$ = of(search).pipe(
      tap(() => (this.loading = true)),
      switchMap((search) => {
        if (!search || search.name) {
          this.loading = false;
          return of([]);
        } else if (!isNaN(search)) {
          return this.clanSearchService.numericClanSearch(search);
        } else if (search.indexOf && search.indexOf('https://www.bungie.net/') > -1) {
          const clanId = search.split('=')[1];
          return this.clanSearchService.numericClanSearch(clanId);
        } else {
          //return this.textClanSearch(currentQuery);
          return this.clanSearchService.combinedSearch(search);
        }
      }),
      tap(() => (this.loading = false)),
      catchError((err) => {
        this.loading = false;
        // Just remapping the data to show the error
        // There are better ways of doing this
        return of([]);
      })
    );
  }

  addClan(clan: GroupsV2GroupV2Card) {
    this.clanSearchService.addClan(clan);
  }

  addMembersClan(member: any) {
    this.clanSearchService.findPlayerClan(member);
  }
}
