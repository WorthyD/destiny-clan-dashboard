export interface MemberActivityStat {
  period?: string;

  activityDetails?: DestinyHistoricalStatsDestinyHistoricalStatsActivity;
  values?: {
    [key: string]: DestinyHistoricalStatsDestinyHistoricalStatsValue;
  };
}

export interface MemberActivityStats {
  id: string;
  activities: MemberActivityStat[];
}

interface DestinyHistoricalStatsDestinyHistoricalStatsActivity {
  referenceId?: number;
  directorActivityHash?: number;
  instanceId?: number;
  mode?: number;
  modes?: Array<number>;
  isPrivate?: boolean;
  membershipType?: number;
}
interface DestinyHistoricalStatsDestinyHistoricalStatsValue {
  statId?: string;
  basic?: DestinyHistoricalStatsDestinyHistoricalStatsValuePair;
  pga?: DestinyHistoricalStatsDestinyHistoricalStatsValuePair;
  weighted?: DestinyHistoricalStatsDestinyHistoricalStatsValuePair;
  activityId?: number;
}
export interface DestinyHistoricalStatsDestinyHistoricalStatsValuePair {
  value?: number;
  displayValue?: string;
}
