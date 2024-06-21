export interface StatAggregator {
  getClanActivityStatsForDuration: (memberActivities: any, activityMode: any, days?: number) => any;
}
