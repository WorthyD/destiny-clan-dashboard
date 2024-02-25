// import { Injectable } from '@angular/core';
import { AppIndexedDb, StoreId, DBObject, STORE_IDS } from '../db/clan-indexed-db';

//  @Injectable({providedIn: 'root'})
export class ClanDatabase {
  private databases: { [key: string]: AppIndexedDb };
  //  private database: AppIndexedDb;
  constructor() {
    this.databases = {};
  }

  getAll(repository: string, type: StoreId): Promise<DBObject[]> {
    return this.getDatabase(repository).getAllData(type);
  }

  getById(repository: string, type: StoreId, id: string): Promise<DBObject> {
    return this.getDatabase(repository).getById(type, id);
  }

  update(repository: string, type: StoreId, entities: any[]): Promise<void> {
    return this.getDatabase(repository).updateValues(entities, type);
  }

  remove(repository: string, type: StoreId, ids: string[]): Promise<void> {
    return this.getDatabase(repository).removeValues(ids, type);
  }

  removeAll(repository: string, type: StoreId) {
    return this.getDatabase(repository).removeAllValues(type);
  }

  deleteDatabase(repository: string) {
    return this.getDatabase(repository, false).purgeDatabase();
  }

  purgeDatabase(repository: string) {
    STORE_IDS.forEach((storeId) => {
      this.getDatabase(repository, false).removeAllValues(storeId);
    });
  }

  private getDatabase(repository: string, initializeValues: boolean = true) {
    if (this.databases && this.databases[repository]) {
      return this.databases[repository];
    }
    const newDB = new AppIndexedDb(repository, initializeValues);
    this.databases[repository] = newDB;
    return this.databases[repository];
  }
}
