import { openDB, deleteDB, IDBPDatabase } from 'idb';

export class BaseAppIndexedDb {
  name: string;
  dbVersion: number;
  storeIds: string[];

  private db: Promise<IDBPDatabase>;

  constructor(name: string, dbVersion: number, storeIds: string[], initializeValues: boolean = true) {
    this.dbVersion = dbVersion;
    this.storeIds = storeIds;

    if (initializeValues) {
      this.resetInitialValues();
    }
    this.name = name;
    this.openDb();
  }

  close() {
    return this.db.then((db) => db.close());
  }

  private resetInitialValues() {}

  getAllData(store: string) {
    return this.db.then((db) => {
      return db.transaction(store, 'readonly').objectStore(store).getAll();
    });
  }

  getById(store: string, id) {
    return this.db.then((db) => {
      return db.transaction(store, 'readonly').objectStore(store).get(id);
    });
  }

  removeData() {
    this.db
      .then((db) => {
        this.resetInitialValues();
        db.close();
        return deleteDB(this.name);
      })
      .then(() => this.openDb());
  }

  purgeDatabase() {
    return this.close().then((db) => {
      return deleteDB(this.name);
    });
  }

  updateValues(values: any[], collectionId: string) {
    return this.db.then((db) => {
      const transaction = db.transaction(collectionId, 'readwrite');
      const store = transaction.objectStore(collectionId);
      values.forEach((v) => store.put(v));
      return transaction.done;
    });
  }

  removeValues(ids: string[], collectionId: string) {
    return this.db.then((db) => {
      const transaction = db.transaction(collectionId, 'readwrite');
      const store = transaction.objectStore(collectionId);
      ids.forEach((id) => store.delete(id));
      return transaction.done;
    });
  }

  removeAllValues(collectionId: string) {
    return this.db.then((db) => {
      const transaction = db.transaction(collectionId, 'readwrite');
      const store = transaction.objectStore(collectionId);
      return store.clear();
    });
  }

  private openDb() {
    const base = this;
    this.db = openDB(this.name, this.dbVersion, {
      upgrade(db, oldVersion, newVersion, transaction) {
        base.storeIds.forEach((collectionId) => {
          if (!db.objectStoreNames.contains(collectionId)) {
            const objectStore = db.createObjectStore(collectionId, {
              keyPath: 'id'
            });
          }
        });
      }
    });
  }
}
