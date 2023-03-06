import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { ClanMemberRecentActivityService } from 'projects/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.service';
import { DailyClanAggregateTimeService } from 'projects/data/src/lib/stat-aggregators/clan-aggregate-time';
import { from, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, take, toArray } from 'rxjs/operators';
import { AggregateType } from '../../../../../data/src/lib/stat-aggregators/clan-aggregate-time';
interface MSGData {
  apiKey: string;
  statAggregatorType: AggregateType;
  clansAndMembers: {
    clan: { clanId: number };
    members: any[];
    profiles: any[];
  }[];
}

addEventListener('message', ({ data }: { data: MSGData }) => {
  const { clansAndMembers, apiKey, statAggregatorType } = data;
  const clanDatabase = new ClanDatabase();
  const profileService = new ClanMemberRecentActivityService(clanDatabase, apiKey);

  from(clansAndMembers)
    .pipe(
      mergeMap((clanAndMembers) => {
        return profileService.getAllActivitiesFromCache(clanAndMembers.clan.clanId, clanAndMembers.profiles);
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