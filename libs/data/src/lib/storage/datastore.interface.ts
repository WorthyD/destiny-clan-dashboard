export interface DataStore {
  get<T = any>(key: string, customStore: any): Promise<T | undefined>;
  set(key: string, value: any, customStore: any): Promise<void>;
}
