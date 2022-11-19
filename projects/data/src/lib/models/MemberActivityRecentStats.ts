// import { DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from 'bungie-api-angular';
// interface MemberActivityStat extends DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup {}

export interface MemberActivityRecentStats {
  id: string;
  activities: MemberActivityRecentStatsActivity[];
  lastNinetyDays: number;
  lastMonth: number;
  lastWeek: number;
}
export interface MemberActivityRecentStatsActivity {
  date: string | Date;
  seconds: number;
}
