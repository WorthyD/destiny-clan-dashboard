// import { DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from 'bungie-api-angular';
// interface MemberActivityStat extends DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup {}

export interface MemberActivityRecentStats {
  id: string;
  activities: MemberActivityRecentStatsActivity[];
  trackedDates: { [key: string]: number };
}
export interface MemberActivityRecentStatsActivity {
  date: string | Date;
  seconds: number;
}
