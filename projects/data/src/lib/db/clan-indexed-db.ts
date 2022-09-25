import { BaseAppIndexedDb } from './base-indexed-db';

const DB_VERSION = 5;

export enum StoreId {
  CacheDetails = 'CacheDetails', //TODO: Verify
  ClanDetails = 'ClanDetails',
  ClanRewards = 'ClanRewards', // TODO: Verify
  MemberProfiles = 'MemberProfiles',
  MemberActivities = 'MemberActivities',
  MemberActivityStats = 'MemberActivityStats', // TODO: Verify
  MemberRecentActivities = 'MemberRecentActivities',
  ProfileMilestones = 'ProfileMilestones', // TODO  Verfiy
  ProfileMetrics = 'ProfileMetrics', // TODO: Verify
  Raids = 'Raids' // TODO verify
}

export const STORE_IDS: StoreId[] = [
  StoreId.CacheDetails,
  StoreId.ClanDetails,
  StoreId.ClanRewards,
  StoreId.MemberProfiles,
  StoreId.MemberActivities,
  StoreId.MemberRecentActivities,
  StoreId.ProfileMilestones,
  StoreId.MemberActivityStats,
  StoreId.ProfileMetrics,
  StoreId.Raids
];

export interface DBObject {
  id: string;
  data: any;
  createDate: Date;
}

export class AppIndexedDb extends BaseAppIndexedDb {
  constructor(name: string, initializeValues: boolean = true) {
    super(name, DB_VERSION, STORE_IDS, initializeValues);
  }

  override getAllData(store: StoreId) {
    return super.getAllData(store);
  }

  override getById(store: StoreId, id) {
    return super.getById(store, id);
  }

  override updateValues(values: DBObject[], collectionId: string) {
    return super.updateValues(values, collectionId);
  }
}
