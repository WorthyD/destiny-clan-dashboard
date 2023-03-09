// //import { ClanMemberActivityService } from 'projects/data/src/lib/clan-db/clan-member-activity/clan-member-activity.service';

import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { TrackedDuration } from 'projects/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.serializer';
// import { ClanMemberRecentActivityService } from 'projects/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.service';
import { ClanActivityService } from 'projects/data/src/lib/stat-aggregators/clan-activity.service';
import { getClanMemberId, getMemberProfileId } from 'projects/data/src/lib/utility/get-ids';
import { filter, from, map, mergeMap, toArray } from 'rxjs';

// import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
// import { ClanMemberRecentActivityService } from 'projects/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.service';
// import { DailyClanAggregateTimeService } from 'projects/data/src/lib/stat-aggregators/clan-aggregate-time/daily-clan-aggregate-time.service';
// // import { ClanDatabase } from 'projects/data/src/lib/clan-db/ClanDatabase';
// // tslint:disable-next-line:max-line-length
// // import { DailyClanAggregateTimeService } from 'projects/data/src/lib/stat-aggregators/clan-aggregate-time/daily-clan-aggregate-time.service';
// // import { WeeklyClanAggregateTimeService } from 'projects/data/src/lib/stat-aggregators/clan-aggregate-time/weekly-clan-aggregate-time.service';

// import { playtime } from 'projects/data/src/lib/utility/date-utils';
// import { map, take } from 'rxjs/operators';
interface MSGData {
  apiKey: string;
  activityModeId: number;
  trackedDates: TrackedDuration[];
  clansAndMembers: {
    clan: { clanId: number; clanName: string; clanTag: string };
    members: any[];
    profiles: any[];
  }[];
}
addEventListener('message', ({ data }: { data: MSGData }) => {
  const { clansAndMembers, apiKey, trackedDates, activityModeId } = data;
  const clanDatabase = new ClanDatabase();
  // const profileService = new ClanMemberRecentActivityService(clanDatabase, apiKey);
  const profileService = new ClanActivityService(clanDatabase, data.apiKey);
  from(clansAndMembers)
    .pipe(
      mergeMap((clanAndMembers) => {
        return profileService
          .getClanActivityStats(clanAndMembers.clan.clanId, clanAndMembers.profiles, trackedDates, activityModeId)
          .pipe(
            map((memberStats) => {
              return clanAndMembers.members.map((member) => {
                const memberId = getClanMemberId(member);
                return {
                  member,
                  profile: clanAndMembers.profiles.find((m) => getMemberProfileId(m) === memberId),
                  stats: memberStats.find((x) => getMemberProfileId(x.memberProfile) === memberId)?.stats,
                  clan: {
                    clanId: clanAndMembers.clan.clanId,
                    clanName: clanAndMembers.clan.clanName,
                    clanTag: clanAndMembers.clan.clanTag
                  }
                };
              });
            })
          );
      }),
      filter((x) => !!x),
      toArray(),
      map((x) => x.flatMap((y) => y))
    )

    .subscribe((x) => {
      postMessage({ type: 'complete', data: x });
    });

  //   const clanDatabase = new ClanDatabase();
  //   const profileService = new ClanMemberRecentActivityService(clanDatabase, data.apiKey);
  //   const weekAggregator = new DailyClanAggregateTimeService(clanDatabase, data.apiKey);
  //   //  console.log(data.memberProfiles);
  //   profileService
  //     .getAllActivitiesFromCache2(data.clanId, data.memberProfiles, data.activityId)
  //     .pipe(
  //       take(1),
  //       // map((x) => {
  //       //   return x.map((y) => {
  //       //     return {
  //       //       ...y,
  //       //       profileName: data.memberProfiles.find(
  //       //         (p) => `${p.profile.data.userInfo.membershipType}-${p.profile.data.userInfo.membershipId}` === y.id
  //       //       )?.profile.data.userInfo.displayName
  //       //     };
  //       //   });
  //       // }),
  //       map((x) => {
  //         return {
  //           events: weekAggregator.getClanActivityStatsForDuration(x, 0, 14),
  //           players: weekAggregator
  //             .getClanActivityByPlayer(x, 0, 14)
  //             .sort((a, b) => {
  //               return b.seconds - a.seconds;
  //             })
  //             .map((y) => {
  //               return {
  //                 name: data.memberProfiles.find(
  //                   (p) => `${p.profile.data.userInfo.membershipType}-${p.profile.data.userInfo.membershipId}` === y.id
  //                 )?.profile.data.userInfo.displayName,
  //                 value: playtime(y.seconds, false)
  //               };
  //             })
  //         };
  //       })
  //     )
  //     .subscribe((x) => {
  //       postMessage({ type: 'complete', data: x });
  //     });
});
