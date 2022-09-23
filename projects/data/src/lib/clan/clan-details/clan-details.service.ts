import { Injectable } from '@angular/core';
import { Destiny2Service, GroupV2Service } from 'bungie-api-angular';
import { StoreId } from '../../db/app-indexed-db';

import { map, take, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ClanDatabase } from '../clan-database';
import { of, from } from 'rxjs';
import { BaseClanService } from '../base-clan.service';

@Injectable()
export class ClanDetailsService extends BaseClanService {
  // private tableName: StoreId = 'ClanDetails';
  private rowId = 'ClanDetails';

  constructor(private groupService: GroupV2Service, private clanDb: ClanDatabase) {
    super(clanDb, StoreId.ClanDetails);
  }
  private getClanDetailsFromAPI(clanId: number) {
    return this.groupService.groupV2GetGroup(clanId);
  }

  private getClanDetails(clanId: number) {
    return from(this.getDataFromCache(clanId.toString(), this.rowId)).pipe(
      switchMap((cachedData) => {
        if (this.isCacheValid(cachedData, 10)) {
          return of(cachedData?.data);
        }

        return this.getClanDetailsFromAPI(clanId).pipe(
          map((clanDetail) => {
            if (clanDetail.Response) {
              this.updateDB(clanId, this.rowId, clanDetail.Response.detail);

              return clanDetail.Response.detail;
            }
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
  getClanDetailsSerialized(clanId: number) {
    return this.getClanDetails(clanId).pipe(
      map((clanDetails) => {
        // Todo: serialize
        return clanDetails;
      })
    );
  }
}
