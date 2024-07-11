import { ClanDatabase } from '@dcd/shared/clan-db';
import { ClanDbObject, ClanStoreId } from '@dcd/shared/utils/legacy-db';
import { isValidDate, nowPlusMinutes } from '@dcd/shared/utils';

export class BaseClanService {
  tableName;
  constructor(private clanDbBase: ClanDatabase, private tableNameBase: ClanStoreId) {
    this.tableName = tableNameBase;
  }

  getDataFromCache(clanId: string, rowId: string): Promise<ClanDbObject> {
    return this.clanDbBase.getById(clanId, this.tableNameBase, rowId);
  }

  getAllDataFromCache(clanId: string): Promise<ClanDbObject[]> {
    return this.clanDbBase.getAll(clanId, this.tableNameBase);
  }

  isCacheValid(cachedData: ClanDbObject, minuteExpiration: number, lastActivity?: Date) {
    if (cachedData && cachedData.createDate) {
      const cacheDate = cachedData.createDate;
      let expireDate;
      if (isValidDate(lastActivity)) {
        if (minuteExpiration === 0) {
          expireDate = lastActivity;
        } else {
          const minuteXP = nowPlusMinutes(-minuteExpiration);
          const lastActivityXP = lastActivity!;
          expireDate = minuteXP > lastActivityXP ? lastActivityXP : minuteXP;
        }
      } else {
        expireDate = nowPlusMinutes(-minuteExpiration);
      }
      return cacheDate > expireDate!;
    }
    return false;
  }

  updateDB(clanId: string, rowId: string, data: any) {
    this.clanDbBase.update(clanId, this.tableName, [
      {
        id: rowId,
        createDate: new Date(),
        data: data
      }
    ]);
  }
}
