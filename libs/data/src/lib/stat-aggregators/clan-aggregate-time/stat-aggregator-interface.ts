export interface StatAggregator {
  getClanActivityStatsForDuration: (memberActivities, activityMode: any, days?: number) => any;
}
