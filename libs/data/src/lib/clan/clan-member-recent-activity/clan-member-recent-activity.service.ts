import { BaseMemberActivityService } from '../base-member-activity.service';
// import { ClanDatabase } from '../ClanDatabase';
// import { StoreId } from '../app-indexed-db';
import { from, Observable } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
// import { MemberActivityStats, MemberProfile, MemberActivityRecentStats } from 'bungie-models';

//import { clanMemberRecentActivitySerializer } from './clan-member-recent-activity.serializer';
//import { MemberProfile } from 'projects/bungie-models/src/lib/models/MemberProfile';
//import { MemberActivityRecentStats } from 'projects/bungie-models/src/lib/models/MemberActivityRecentStats';
import { ClanDatabase } from '../clan-database';
import { ClanStoreId } from '@dcd/shared/utils/legacy-db';
// import { MemberProfile } from '../../models';
import { MemberActivityRecentStats } from '@dcd/shared/models';
import { clanMemberRecentActivitySerializer, TrackedDuration } from './clan-member-recent-activity.serializer';

interface MemberProfile {
  profile: any;
}

export class ClanMemberRecentActivityService extends BaseMemberActivityService {
  private concurrentRequests = 5;
  constructor(private clanDB: ClanDatabase, private baseApiKey: string) {
    super(
      clanDB,
      ClanStoreId.MemberRecentActivities,
      baseApiKey,
      new Date(new Date().setDate(new Date().getDate() + ((2 + 7 - new Date().getDay()) % 7) - 90)),
      8,
      0
    );
  }
  getSerializedProfileActivity(
    clanId: number,
    member: any,
    useCache: boolean,
    trackedDates: TrackedDuration[],
    activityMode: number = 0,
    activityTypeId: number = 0
  ): Observable<MemberActivityRecentStats> {
    return this.getMemberActivity(clanId, member, useCache, activityMode, activityTypeId).pipe(
      map((profileActivity) => {
        return clanMemberRecentActivitySerializer(profileActivity, trackedDates);
      })
    );
  }
}
