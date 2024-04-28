//import { ClanDatabase } from '../ClanDatabase';
import { map, catchError, mergeMap, bufferTime, toArray } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';

//import { StoreId } from '../app-indexed-db';

import { nowPlusDays, unixTimeStampToDate } from '@destiny-clan-dashboard/shared/utils';
import { ClanStoreId } from '@dcd/shared/utils/legacy-db';
import { ClanDatabase } from '../clan-database';
import { ClanMember } from '@dcd/shared/models';
import { ProfileService } from '../../profile/profile.service';
import { profileSerializer } from '../../profile/profile.serializer';
//import { MemberProfile } from '../../models/MemberProfile';
// import { ClanMember } from 'projects/bungie-models/src/lib/models/ClanMember';
// import { latestSeason } from 'projects/bungie-models/src/lib/entities/seasons/season-latest';
interface MemberProfile {}

export class ClanProfileService extends ProfileService {
  private tableName: ClanStoreId = ClanStoreId.MemberProfiles;
  private concurrentRequests = 20;

  //  private profileComponents = [100, 104, 200, 202, 800, 900, 1100];

  constructor(private clanDb: ClanDatabase, private apiKey: string) {
    super(apiKey);
  }

  private getProfileFromCache(clanId: string, member: ClanMember) {
    return this.clanDb.getById(clanId, this.tableName, this.getProfileId(member));
  }

  getProfile(clanId: string, member: ClanMember): Observable<any> {
    return from(this.getProfileFromCache(clanId, member)).pipe(
      mergeMap((cachedData) => {
        if (cachedData && cachedData.createDate) {
          const cacheDate = cachedData.createDate;
          const lastStatusChange = unixTimeStampToDate(member.lastOnlineStatusChange);
          const staleXP = nowPlusDays(-1);
          // Make sure we recapture new data after season change
          const expireDate = staleXP > lastStatusChange ? staleXP : lastStatusChange;

          if (cacheDate > expireDate) {
            return of(cachedData?.data);
          }
        }
        return this.getProfileFromAPI(member.destinyUserInfo.membershipType, member.destinyUserInfo.membershipId).pipe(
          map((memberProfileResponse: any) => {
            if (memberProfileResponse.Response) {
              this.clanDb.update(clanId, this.tableName, [
                {
                  id: this.getProfileId(member),
                  createDate: new Date(),
                  data: memberProfileResponse.Response
                }
              ]);

              return memberProfileResponse.Response;
            }
          }),
          catchError((error) => {
            if (cachedData && cachedData.data) {
              return of(cachedData.data);
            }
            if (error?.ErrorStatus === 'DestinyAccountNotFound') {
              console.error(`Error retrieving profile, not found`, member);
              return of();
            }
            if (error?.ErrorStatus === 'DestinyUnexpectedError') {
              console.error(`Error retrieving profile`, member);
              return of();
            }

            throw error;
          })
        );
      })
    );
  }
  getSerializedProfile(
    clanId: string,
    member: ClanMember,
    progressionHashes: any[],
    collectionHashes: any[],
    profileRecords: any[],
    profileMetrics: any[]
  ): Observable<MemberProfile> {
    return this.getProfile(clanId, member).pipe(
      map((profile) => {
        return profileSerializer(
          profile,
          progressionHashes,
          collectionHashes,
          profileRecords,
          profileMetrics
        ) as MemberProfile;
      })
    );
  }
  getSerializedProfiles<T>(
    clanId: string,
    members: ClanMember[],
    progressionHashes: any[],
    collectionHashes: any[],
    profileRecords: any[],
    profileMetrics: any[]
  ): Observable<T> {
    return from(members).pipe(
      mergeMap(
        (member) =>
          this.getSerializedProfile(
            clanId,
            member,
            progressionHashes,
            collectionHashes,
            profileRecords,
            profileMetrics
          ),
        100
      )
    ) as Observable<T>;
  }
  getSerializedProfilesFromCache(
    clanId: string,
    members: ClanMember[],
    progressionHashes: any[],
    collectionHashes: any[],
    profileRecords: any[],
    profileMetrics: any[]
  ): Observable<MemberProfile[]> {
    return from(members).pipe(
      mergeMap(
        (member) =>
          this.getSerializedProfileFromCache(
            clanId,
            member,
            progressionHashes,
            collectionHashes,
            profileRecords,
            profileMetrics
          ),
        100
      ),
      toArray()
    );
  }

  getSerializedProfilesWithProgress(
    clanId: string,
    members: ClanMember[],
    progressionHashes: any[],
    progress?: (done) => any
  ): Observable<MemberProfile[]> {
    let complete = 0;
    return from(members)
      .pipe(
        mergeMap(
          (member) => this.getSerializedProfile(clanId, member, progressionHashes, [], [], []),
          this.concurrentRequests
        )
      )
      .pipe(
        bufferTime(1000, undefined, 100),
        /**
         * Don't continue processing if the timer in `bufferTime` was reached and
         *   there are no buffered companies.
         */
        mergeMap((memberResp) => {
          complete += memberResp.length;
          if (progress) {
            progress(complete);
          }
          return memberResp;
        }),
        toArray()
      );
  }

  getSerializedProfileFromCache(
    clanId: string,
    member: ClanMember,
    progressionHashes: any[],
    collectionHashes: any[],
    profileRecords: any[],
    profileMetrics: any[]
  ): Observable<MemberProfile> {
    return from(this.getProfileFromCache(clanId, member)).pipe(
      map((profile) => {
        return profileSerializer(
          profile?.data || [],
          progressionHashes,
          collectionHashes,
          profileRecords,
          profileMetrics
        ) as MemberProfile;
      })
    );
  }
}
