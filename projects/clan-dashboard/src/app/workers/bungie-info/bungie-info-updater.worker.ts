import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { BungieInfoService } from 'projects/data/src/lib/clan/bungie-info/bungie-info.service';
import { take } from 'rxjs/operators';

addEventListener('message', ({ data }) => {
  const clanDatabase = new ClanDatabase();
  const bungieInfoService = new BungieInfoService(clanDatabase, data.apiKey);

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
