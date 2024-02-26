//import { Injectable } from '@angular/core';
//import { ActivityStats, MemberProfile, ClanMember, MemberActivityTime } from 'bungie-models';
//import { forkJoin, from, Observable } from 'rxjs';
//import { map, mergeMap, toArray } from 'rxjs/operators';
// import { MemberActivityTime } from 'projects/bungie-models/src/lib/models/MemberActivityTime';
import { MemberActivityTime } from '../../models/MemberActivityTime';
import { nowPlusDays } from '@destiny-clan-dashboard/shared/utils';
import { groupActivityStatsByDate } from '@destiny-clan-dashboard/shared/utils';
import { BaseClanAggregateTimeService } from './base-clan-aggregate-time.service';
import { StatAggregator } from './stat-aggregator-interface';

export class DailyClanAggregateTimeService extends BaseClanAggregateTimeService implements StatAggregator {
  public getClanActivityStatsForDuration(memberActivities: MemberActivityTime[], activityMode: any, days = 60) {
    const x = this.filterDates(memberActivities, nowPlusDays(-days));

    const activities = [...x.map((y) => y.activities)];
    const flatActivities = [].concat.apply([], activities);
    const summedActivities = groupActivityStatsByDate(flatActivities);
    return summedActivities;
  }
  public getClanActivityByPlayer(memberActivities: MemberActivityTime[], activityMode: any, days = 60) {
    const x = this.filterDates(memberActivities, nowPlusDays(-days));

    const results = x.map((y) => {
      return {
        id: y.id,
        seconds: y.activities.reduce((prev, next) => prev + next.seconds, 0)
      };
    });

    return results;
  }
}
