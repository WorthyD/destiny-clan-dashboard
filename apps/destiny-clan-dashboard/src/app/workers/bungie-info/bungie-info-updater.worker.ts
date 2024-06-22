//import { ClanDatabase } from 'libs/data/src/lib/clan/clan-database';
import { ClanDatabase } from '@dcd/shared/clan-db';
import { ClanBungieInfoService } from '@dcd/shared/data-access/clan-collections';
import { take } from 'rxjs/operators';

addEventListener('message', ({ data }) => {
  const clanDatabase = new ClanDatabase();
  const bungieInfoService = new ClanBungieInfoService(clanDatabase, data.apiKey);

  const progress = (progressData) => {
    postMessage({ type: 'progress', data: progressData });
  };

  bungieInfoService
    .getSerializedBungieInfosWithProgress(data.clanId, data.clanMembers, progress)
    .pipe(take(1))
    .subscribe((x) => {
      postMessage({ type: 'complete', data: x });
    });
});
