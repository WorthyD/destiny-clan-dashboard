import { ClanDatabase } from 'projects/data/src/lib/clan/clan-database';
import { ClanProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { take } from 'rxjs/operators';

addEventListener('message', ({ data }) => {
  const clanDatabase = new ClanDatabase();
  const profileService = new ClanProfileService(clanDatabase, data.apiKey);

  const progress = (progressData) => {
    postMessage({ type: 'progress', data: progressData });
  };

  profileService
    .getSerializedProfilesWithProgress(data.clanId, data.clanMembers, data.progressionHashes, progress)
    .pipe(take(1))
    .subscribe((x) => {
      postMessage({ type: 'complete', data: x });
    });
});
