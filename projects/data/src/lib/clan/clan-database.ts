import { AppIndexedDb, StoreId, DBObject, STORE_IDS } from '../db/clan-indexed-db';

export class ClanDatabase {
  private database: AppIndexedDb;

  getAll(repository: string, type: StoreId): Promise<DBObject[]> {
    return this.getDatabase(repository).getAllData(type);
  }

  getById(repository: string, type: StoreId, id: string): Promise<DBObject> {
    console.log('stuff', `${repository}, ${type}, ${id}`);
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
    if (this.database && this.database.name === repository) {
      return this.database;
    }

    if (this.database) {
      this.database.close();
    }

    this.database = new AppIndexedDb(repository, initializeValues);
    return this.database;
  }
}
