import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { addClan } from '@core/store/clans';
import { selectAllClans } from '@core/store/clans/clans.selectors';
import { Store } from '@ngrx/store';
import { GroupsV2GroupV2Card, GroupV2Service } from 'bungie-api-angular';
import { forkJoin, map, Observable, take } from 'rxjs';
import { ClanSearchModule } from '../clan-search-shell/clan-search-shell.module';
import { SearchErrorDialogComponent } from '../components/search-error-dialog/search-error-dialog.component';
import { ClanSearchResultItem } from '../models/ClanSearchResultItem';

@Injectable({
  providedIn: ClanSearchModule
})
export class ClanSearchService {
  constructor(
    private groupService: GroupV2Service,
    private httpClient: HttpClient,
    private store: Store,
    public dialog: MatDialog
  ) {}

  clans$ = this.store.select(selectAllClans);

  numericClanSearch(clanId) {
    return this.groupService.groupV2GetGroup(clanId).pipe(
      map((clanResult) => {
        const c = clanResult.Response.detail;
        return [
          {
            iconName: this.getIcon(-1),
            type: 'clan',
            name: c.name,
            id: c.groupId.toString(),
            clanInfo: c
          }
        ];
      })
    );
  }
  textClanSearch(currentQuery): Observable<ClanSearchResultItem[]> {
    return this.groupService
      .groupV2GroupSearch({
        name: currentQuery,
        groupType: 1,
        groupMemberCountFilter: null,
        tagText: null,
        localeFilter: null
      })
      .pipe(
        map((clanListResults) => {
          const clanList = clanListResults.Response.results;

          return clanList.slice(0, 10).map((c) => {
            return {
              iconName: this.getIcon(-1),
              type: 'clan',
              name: c.name,
              id: c.groupId.toString(),
              clanInfo: c
            };
          });
        })
      );
  }
  combinedSearch(currentQuery) {
    const clanSearch = this.textClanSearch(currentQuery);
    const playerSearch = this.textPlayerSearch(currentQuery);

    return forkJoin([clanSearch, playerSearch]).pipe(
      map(([clanSearchResults, playerSearchResults]) => {
        return [...clanSearchResults, ...playerSearchResults];
      })
    );
  }
  textPlayerSearch(currentQuery): Observable<ClanSearchResultItem[]> {
    const url = `https://www.bungie.net/Platform/User/Search/Prefix/${currentQuery}/0`;
    return this.httpClient.get(url).pipe(
      map((searchResults: any) => {
        return searchResults.Response.searchResults.slice(0, 10).map((profile) => {
          const displayName = `${profile.bungieGlobalDisplayName}#${profile.bungieGlobalDisplayNameCode}`;
          const memberships = profile.destinyMemberships;
          const crossSaveOverride = memberships.find((x) => x.crossSaveOverride !== 0);
          let membership;
          if (crossSaveOverride) {
            membership = memberships.find((x) => x.membershipType === crossSaveOverride.crossSaveOverride);
          } else {
            membership = memberships[0];
          }

          return {
            iconName: this.getIcon(membership.membershipType),
            name: displayName,
            memberInfo: membership,
            type: 'player'
          };
        });
      })
    );
  }

  findPlayerClan(selectedItem) {
    return this.groupService
      .groupV2GetGroupsForMember(0, 1, selectedItem.membershipId, selectedItem.membershipType)
      .pipe(take(1))
      .subscribe(({ Response }) => {
        if (Response.totalResults > 0) {
          //this.persistSelection(Response.results[0]?.group);
          //this.open(Response.results[0]?.group);
          this.addClan(Response.results[0]?.group);
        } else {
          this.dialog.open(SearchErrorDialogComponent, { data: 'No clan found for the user.' });
        }
      });
  }

  addClan(clan: GroupsV2GroupV2Card) {
    this.store.dispatch(
      addClan({ clanId: clan.groupId.toString(), clanName: clan.name, clanTag: clan.clanInfo.clanCallsign || '' })
    );
  }

  getIcon(type: number) {
    switch (type) {
      case -1:
        return 'people';
      case 1:
        return 'xbox';
      case 2:
        return 'playstation';
      case 3:
        return 'steam';
      default:
        return 'sports_esports';
    }
  }
}
