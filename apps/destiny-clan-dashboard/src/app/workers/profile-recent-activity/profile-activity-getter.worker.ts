import { ClanDatabase } from 'libs/data/src/lib/clan/clan-database';
import { ClanMemberRecentActivityService } from 'libs/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.service';
import { DailyClanAggregateTimeService } from 'libs/data/src/lib/stat-aggregators/clan-aggregate-time';
import { from, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, take, toArray } from 'rxjs/operators';
// import { AggregateType } from '../../../../../data/src/lib/stat-aggregators/clan-aggregate-time';
import { AggregateType } from '@destiny-clan-dashboard/data/stat-aggregators/clan-aggregate-time';
interface MSGData {
  apiKey: string;
  statAggregatorType: AggregateType;
  activityModeId: number;
  activityTypeId: number;
  clansAndMembers: {
    clan: { clanId: number };
    members: any[];
    profiles: any[];
  }[];
}

addEventListener('message', ({ data }: { data: MSGData }) => {
  const { clansAndMembers, apiKey, statAggregatorType, activityModeId, activityTypeId } = data;
  const clanDatabase = new ClanDatabase();
  const profileService = new ClanMemberRecentActivityService(clanDatabase, apiKey);

  from(clansAndMembers)
    .pipe(
      mergeMap((clanAndMembers) => {
        return profileService.getAllActivitiesFromCache(
          clanAndMembers.clan.clanId,
          clanAndMembers.profiles,
          activityModeId,
          activityTypeId
        );
      }),
      filter((x) => !!x),
      toArray(),
      map((x) => x.flatMap((y) => y)),
      map((x) => {
        let statAggregator;
        if (statAggregatorType === 'daily') {
          statAggregator = new DailyClanAggregateTimeService(clanDatabase, apiKey);
        }
        //const aggregator = getAggregator(statAggregatorType);
        return statAggregator.getClanActivityStatsForDuration(x, 0);
      })
    )
    .subscribe((x) => {
      postMessage({ type: 'complete', data: x });
    });
});