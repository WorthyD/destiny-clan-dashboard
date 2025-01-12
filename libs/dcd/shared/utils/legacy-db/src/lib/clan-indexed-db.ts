import { BaseAppIndexedDb } from './base-indexed-db';

const DB_VERSION = 6;

export enum StoreId {
  ClanDetails = 'ClanDetails',
  MemberProfiles = 'MemberProfiles',
  MemberActivities = 'MemberActivities',
  MemberRecentActivities = 'MemberRecentActivities',
  BungieInfo = 'BungieInfo'
}

export const STORE_IDS: StoreId[] = [
  StoreId.ClanDetails,
  StoreId.MemberProfiles,
  StoreId.MemberActivities,
  StoreId.MemberRecentActivities,
  StoreId.BungieInfo
];

export interface DBObject {
  id: string;
  data: any;
  createDate: Date;
}

export class AppIndexedDb extends BaseAppIndexedDb {
  constructor(name: string, initializeValues: boolean = true) {
    super(`D2DB-${name}`, DB_VERSION, STORE_IDS, initializeValues);
  }

  override getAllData(store: StoreId) {
    return super.getAllData(store);
  }

  override getById(store: StoreId, id: string) {
    return super.getById(store, id);
  }

  override updateValues(values: DBObject[], collectionId: string) {
    return super.updateValues(values, collectionId);
  }
}
