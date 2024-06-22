//import { ClanMemberActivityService } from 'projects/data/src/lib/clan-db/clan-member-activity/clan-member-activity.service';

//import { ClanMemberRecentActivityService } from 'projects/data/src/lib/clan-db/clan-member-recent-activity/clan-member-recent-activity.service';

//import { ClanDatabase } from 'projects/data/src/lib/clan-db/ClanDatabase';
// import { ClanMemberRecentActivityService } from 'projects/data/src/lib/clan/clan-member-recent-activity/clan-member-recent-activity.service';

import { ClanDatabase } from '@dcd/shared/clan-db';
import { ClanActivityService } from '@dcd/shared/data-access/clan-collections';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';

addEventListener('message', ({ data }) => {
  const clanDatabase = new ClanDatabase();
  const profileService = new ClanActivityService(clanDatabase, data.apiKey);

  profileService
    //.getAllActivitiesFromCache(data.clanId, data.memberProfiles)
    .getClanActivityStats(data.clanId, data.memberProfiles, [])
    .pipe(take(1))
    .subscribe((x) => {
      postMessage({ type: 'complete', data: x });
    });



    // const { clansAndMembers, apiKey, activityId } = data;

    // from(clansAndMembers).subscribe((x) => {
    //   postMessage({ type: 'complete', data: x });
    // });
});
