import { ClanDatabase } from '@dcd/shared/clan-db';
import { ClanBungieInfoService } from 'libs/data/src/lib/clan/bungie-info/bungie-info.service';
// import { ClanDatabase } from 'libs/data/src/lib/clan/clan-database';

import { take } from 'rxjs/operators';

addEventListener('message', ({ data }) => {
  const clanDatabase = new ClanDatabase();
  const profileService = new ClanBungieInfoService(clanDatabase, data.apiKey);


  profileService
    .getSerializedBungieInfoFromCache(data.clanId, data.memberProfiles)
    .pipe(take(1))
    .subscribe((x) => {
      postMessage({ type: 'complete', data: x });
    });
});
