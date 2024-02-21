import { Injectable } from '@angular/core';
import { Destiny2Service, GroupsV2GroupMember, GroupV2Service } from 'bungie-api-angular';
//import { DBObject, StoreId } from '../app-indexed-db';

import { map, take, catchError, mergeMap, switchMap, shareReplay, concatMap } from 'rxjs/operators';
import { StoreId } from '../../db/clan-indexed-db';
import { ClanDatabase } from '../clan-database';
import { of, from, Observable } from 'rxjs';
import { BaseClanService } from '../base-clan.service';
import { ClanMembersServiceInterface } from './clan-members.interface';

@Injectable()
export class ClanMembersService extends BaseClanService implements ClanMembersServiceInterface {
  private rowId = 'ClanMembers';
  constructor(private groupService: GroupV2Service, private clanDb: ClanDatabase) {
    super(clanDb, StoreId.ClanDetails);
  }

  private getClanMembersFromAPI(clanId: string) {
    return this.groupService.groupV2GetMembersOfGroup(1, clanId as unknown as number);
  }

  private getClanMembers(clanId: string): Observable<GroupsV2GroupMember[]> {
    // console.time(`getDB-${clanId}`);
    return from(this.getDataFromCache(clanId.toString(), this.rowId)).pipe(
      // concatMap((cachedData) => {
      switchMap((cachedData) => {
        // console.timeEnd(`getDB-${clanId}`);
        if (this.isCacheValid(cachedData, 10)) {
          return of(cachedData?.data);
        }

        return this.getClanMembersFromAPI(clanId).pipe(
          map((clanDetail) => {
            if (clanDetail.Response) {
              this.updateDB(clanId, this.rowId, clanDetail.Response.results);

              return clanDetail.Response.results;
            }
            throw Error('Clan Members Not found');
          }),
          catchError((error) => {
            if (cachedData && cachedData.data) {
              return of(cachedData.data);
            }
            throw error;
          })
        );
      })
    );
  }

  getClanMembersSerialized(clanId: string): Observable<GroupsV2GroupMember[]> {
    return this.getClanMembers(clanId).pipe(
      map((x) => {
        return x;
      })
    );
  }
  getClanMembersCachedSerialized(clanId: string): Observable<GroupsV2GroupMember[]> {
  //   console.log(`getting-${clanId}`);
    return from(this.getDataFromCache(clanId, this.rowId))
      .pipe(
        map((x) => {
        //   console.log(`getting-done-${clanId}`);
          return x?.data;
        })
      )
      .pipe(shareReplay(1));
  }
}
