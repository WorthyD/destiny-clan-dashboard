import { BaseAppIndexedDb } from './base-indexed-db';

const DB_VERSION = 2;

export type StoreId = 'allData';

export const STORE_IDS: StoreId[] = ['allData'];

export class AppIndexedDb extends BaseAppIndexedDb {
  constructor(name: string) {
    super(name, DB_VERSION, STORE_IDS);
  }
}
