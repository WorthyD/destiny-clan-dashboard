import { BaseMemberActivityService } from '../base-member-activity.service';
// import { ClanDatabase } from '../ClanDatabase';
// import { StoreId } from '../app-indexed-db';
import { from, Observable } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
// import { MemberActivityStats, MemberProfile, MemberActivityRecentStats } from 'bungie-models';

import { clanMemberRecentActivitySerializer } from './clan-member-recent-activity.serializer';
import { clanMemberActivitySerializer } from '../clan-member-activity/clan-member-activity.serializer';
import { MemberProfile } from 'projects/bungie-models/src/lib/models/MemberProfile';
import { MemberActivityStats } from 'projects/bungie-models/src/lib/models/MemberActivityStat';
import { MemberActivityRecentStats } from 'projects/bungie-models/src/lib/models/MemberActivityRecentStats';
import { ClanDatabase } from '../clan-database';
import { StoreId } from '../../db/clan-indexed-db';

export class ClanMemberRecentActivityService extends BaseMemberActivityService {
  private concurrentRequests = 5;
  constructor(private clanDB: ClanDatabase, private baseApiKey: string) {
    super(
      clanDB,
      StoreId.MemberRecentActivities,
      baseApiKey,
      // d2Service,
      new Date(new Date().setDate(new Date().getDate() + ((2 + 7 - new Date().getDay()) % 7) - 90)),
      8
    );
  }
  getSerializedProfileActivity(
    clanId: number,
    member: MemberProfile,
    activityMode: number = 0
  ): Observable<MemberActivityRecentStats> {
    return this.getMemberActivity(clanId, member, activityMode).pipe(
      map((profileActivity) => {
        return clanMemberRecentActivitySerializer(profileActivity);
      })
    );
  }
  // getMemberCharacterActivitySerialized(
  //   clanId: number,
  //   member: MemberProfile,
  //   characterId: number,
  //   activityMode: number = 0
  // ) {
  //   return this.getMemberCharacterActivity(clanId, member, characterId).pipe(
  //     map((activity) => {
  //       if (activityMode > 0) {
  //         activity = activity.filter((a) => a.activityDetails.modes.indexOf(activityMode) > -1);
  //       }
  //       return {
  //         activities: activity.map((a) => clanMemberActivitySerializer(a))
  //       };
  //     })
  //   );
  // }
  // getMemberActivity(clanId: number, member: MemberProfile, activityMode: number = 0): Observable<MemberActivityStats> {
  //   return from(member.profile.data.characterIds).pipe(
  //     mergeMap((characterId) => {
  //       return this.getMemberCharacterActivitySerialized(clanId, member, characterId, activityMode);
  //     }),
  //     map((x) => {
  //       return x.activities;
  //     }),
  //     toArray(),
  //     map((x) => {
  //       return {
  //         id: `${member.profile.data.userInfo.membershipType}-${member.profile.data.userInfo.membershipId}`,
  //         activities: [].concat(...x)
  //       };
  //     })
  //   );
  // }

  // getSerializedProfilesActivity(clanId: number, members: MemberProfile[], activityMode: number = 0) {
  //   return from(members).pipe(
  //     mergeMap((member) => this.getSerializedProfileActivity(clanId, member, activityMode), this.concurrentRequests)
  //   );
  // }
  // getSerializedProfileActivity(
  //   clanId: number,
  //   member: MemberProfile,
  //   activityMode: number = 0
  // ): Observable<MemberActivityRecentStats> {
  //   return this.getMemberActivity(clanId, member, activityMode).pipe(
  //     map((profileActivity) => {
  //       return clanMemberRecentActivitySerializer(profileActivity);
  //     })
  //   );
  // }
}
