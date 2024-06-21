// import { Injectable } from '@angular/core';
import { ClanIndexedDb, ClanStoreId, ClanDbObject, CLAN_STORE_IDS } from '@dcd/shared/utils/legacy-db'

//  @Injectable({providedIn: 'root'})
export class ClanDatabase {
  private databases: { [key: string]: ClanIndexedDb };
  //  private database: AppIndexedDb;
  constructor() {
    this.databases = {};
  }

  getAll(repository: string, type: ClanStoreId): Promise<ClanDbObject[]> {
    return this.getDatabase(repository).getAllData(type);
  }

  getById(repository: string, type: ClanStoreId, id: string): Promise<ClanDbObject> {
    return this.getDatabase(repository).getById(type, id);
  }

  update(repository: string, type: ClanStoreId, entities: any[]): Promise<void> {
    return this.getDatabase(repository).updateValues(entities, type);
  }

  remove(repository: string, type: ClanStoreId, ids: string[]): Promise<void> {
    return this.getDatabase(repository).removeValues(ids, type);
  }

  removeAll(repository: string, type: ClanStoreId) {
    return this.getDatabase(repository).removeAllValues(type);
  }

  deleteDatabase(repository: string) {
    return this.getDatabase(repository, false).purgeDatabase();
  }

  purgeDatabase(repository: string) {
    CLAN_STORE_IDS.forEach((storeId) => {
      this.getDatabase(repository, false).removeAllValues(storeId);
    });
  }

  private getDatabase(repository: string, initializeValues: boolean = true) {
    if (this.databases && this.databases[repository]) {
      return this.databases[repository];
    }
    const newDB = new ClanIndexedDb(repository, initializeValues);
    this.databases[repository] = newDB;
    return this.databases[repository];
  }
}
