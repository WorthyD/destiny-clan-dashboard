// import { ClanMemberActivityService } from 'projects/data/src/lib/clan-db/clan-member-activity/clan-member-activity.service';
// import { ClanMemberRecentActivityService } from 'projects/data/src/lib/clan-db/clan-member-recent-activity/clan-member-recent-activity.service';
// import { ClanDatabase } from 'projects/data/src/lib/clan-db/ClanDatabase';
//import { ClanDatabase } from 'libs/data/src/lib/clan/clan-database';
import { ClanDatabase } from '@dcd/shared/clan-db';
import { ClanMemberRecentActivityService } from '@dcd/shared/data-access/clan-collections';
import { take } from 'rxjs/operators';

addEventListener('message', ({ data }) => {
  const clanDatabase = new ClanDatabase();
  const profileService = new ClanMemberRecentActivityService(clanDatabase, data.apiKey);

  const progress = (progressData) => {
    postMessage({ type: 'progress', data: progressData });
  };

  profileService
    .updateAllActivityCache(data.clanId, data.clanMembers, progress)
    .pipe(take(1))
    .subscribe((x) => {
      postMessage({ type: 'complete', data: x });
    });
});
