// TODO: Find better than for this


export interface DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup {
  /**
   * Period for the group. If the stat periodType is day, then this will have a specific day. If the type is monthly, then this value will be the first day of the applicable month. This value is not set when the periodType is \'all time\'.
   */
  period?: string;
  /**
   * If the period group is for a specific activity, this property will be set.
   */
  activityDetails?: DestinyHistoricalStatsDestinyHistoricalStatsActivity;
  /**
   * Collection of stats for the period.
   */
  values?: { [key: string]: DestinyHistoricalStatsDestinyHistoricalStatsValue };
}
export interface DestinyHistoricalStatsDestinyHistoricalStatsValue {
  /**
   * Unique ID for this stat
   */
  statId?: string;
  /**
   * Basic stat value.
   */
  basic?: DestinyHistoricalStatsDestinyHistoricalStatsValuePair;
  /**
   * Per game average for the statistic, if applicable
   */
  pga?: DestinyHistoricalStatsDestinyHistoricalStatsValuePair;
  /**
   * Weighted value of the stat if a weight greater than 1 has been assigned.
   */
  weighted?: DestinyHistoricalStatsDestinyHistoricalStatsValuePair;
  /**
   * When a stat represents the best, most, longest, fastest or some other personal best, the actual activity ID where that personal best was established is available on this property.
   */
  activityId?: number;
}
export interface DestinyHistoricalStatsDestinyHistoricalStatsValuePair {
  /**
   * Raw value of the statistic
   */
  value?: number;
  /**
   * Localized formated version of the value.
   */
  displayValue?: string;
}


export interface DestinyHistoricalStatsDestinyHistoricalStatsActivity {
  /**
   * The unique hash identifier of the DestinyActivityDefinition that was played. If I had this to do over, it\'d be named activityHash. Too late now.
   */
  referenceId?: number;
  /**
   * The unique hash identifier of the DestinyActivityDefinition that was played.
   */
  directorActivityHash?: number;
  /**
   * The unique identifier for this *specific* match that was played.  This value can be used to get additional data about this activity such as who else was playing via the GetPostGameCarnageReport endpoint.
   */
  instanceId?: number;
  /**
   * Indicates the most specific game mode of the activity that we could find.
   */
  mode?: number;
  /**
   * The list of all Activity Modes to which this activity applies, including aggregates. This will let you see, for example, whether the activity was both Clash and part of the Trials of the Nine event.
   */
  modes?: Array<number>;
  /**
   * Whether or not the match was a private match.
   */
  isPrivate?: boolean;
  /**
   * The Membership Type indicating the platform on which this match was played.
   */
  membershipType?: number;
}
