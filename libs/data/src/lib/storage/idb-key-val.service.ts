import { Injectable } from '@angular/core';
import { get, set, createStore, UseStore } from 'idb-keyval';
import { DataStore } from './datastore.interface';

@Injectable()
export class IdbKeyValService implements DataStore {
  defaultStore: UseStore;
  constructor() {
    this.defaultStore = createStore('D2Dashboard', 'data');
  }

  get<T = any>(key: string, customStore = undefined): Promise<T | undefined> {
    return get(key, customStore || this.defaultStore);
  }
  set(key: string, value: any, customStore = undefined): Promise<void> {
    return set(key, value, customStore || this.defaultStore);
  }
}
