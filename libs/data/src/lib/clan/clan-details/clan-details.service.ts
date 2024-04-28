import { Injectable } from '@angular/core';
import { Destiny2Service, GroupV2Service } from 'bungie-api-angular';

import { map, take, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ClanDatabase } from '../clan-database';
import { of, from } from 'rxjs';
import { BaseClanService } from '../base-clan.service';
import { ClanStoreId } from '@dcd/shared/utils/legacy-db';
import { clanDetailSerializer } from './clan-detail-serializer';
import { CLAN_LEVEL_HASH } from '../../hashes/clan-details';

@Injectable()
export class ClanDetailsService extends BaseClanService {
  // private tableName: StoreId = 'ClanDetails';
  private rowId = 'ClanDetails';

  constructor(private groupService: GroupV2Service, private clanDb: ClanDatabase) {
    super(clanDb, ClanStoreId.ClanDetails);
  }
  private getClanDetailsFromAPI(clanId: string) {
    return this.groupService.groupV2GetGroup(clanId as unknown as number);
  }

  private getClanDetails(clanId: string, ignoreOffline: boolean) {
    //console.log(`thinkg ${clanId} ${this.rowId} `);
    return from(this.getDataFromCache(clanId.toString(), this.rowId)).pipe(
      switchMap((cachedData) => {
        if (this.isCacheValid(cachedData, 10)) {
          return of(cachedData?.data);
        }

        return this.getClanDetailsFromAPI(clanId).pipe(
          map((clanDetail) => {
            if (clanDetail.Response) {
              const clanDetails = clanDetailSerializer(clanDetail.Response.detail, [CLAN_LEVEL_HASH]);
              this.updateDB(clanId, this.rowId, clanDetails);

              return clanDetails;
            }
            throw Error('Clan Not found');
          }),
          catchError((error) => {
            if (error?.error?.ErrorStatus === 'SystemDisabled' && !ignoreOffline) {
              throw Error('System Offline');
            }

            if (cachedData && cachedData.data) {
              return of(cachedData.data);
            }
            throw error;
          })
        );
      })
    );
  }

  getClanDetailsSerialized(clanId: string, ignoreOffline: boolean) {
    return this.getClanDetails(clanId, ignoreOffline);
  }
}
