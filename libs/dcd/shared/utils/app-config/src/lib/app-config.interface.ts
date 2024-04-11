export interface AppConfig {
  readonly apiKey: string;
  readonly appVersion: string;
  readonly production: boolean;
  readonly useMocks: boolean;
  readonly constants: {
    readonly PROFILE_UPDATING_EXP_MINUTES: number;
    readonly D2DASHBOARD_ACKNOWLEDGE_OFFLINE: string;
    readonly CURRENT_SEALS_HASH: number;
    readonly LEGACY_SEALS_HASH: number;
    readonly MEMBER_RECENT_ACTIVITY_EXP_MINUTES:number;
  };
}
