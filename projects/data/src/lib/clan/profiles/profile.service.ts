//import { ClanDatabase } from '../ClanDatabase';
import { map, catchError, mergeMap, bufferTime, toArray } from 'rxjs/operators';
import { Observable, from, of, throwError } from 'rxjs';

//import { StoreId } from '../app-indexed-db';

import { profileSerializer } from './profile.serializer';
import { nowPlusDays, unixTimeStampToDate } from '../../utility/date-utils';
import { StoreId } from '../../db/clan-indexed-db';
import { ClanDatabase } from '../clan-database';
import { ClanMember } from '../../models/ClanMember';
//import { MemberProfile } from '../../models/MemberProfile';
// import { ClanMember } from 'projects/bungie-models/src/lib/models/ClanMember';
// import { latestSeason } from 'projects/bungie-models/src/lib/entities/seasons/season-latest';
interface MemberProfile {}

export class ProfileService {
  private tableName: StoreId = StoreId.MemberProfiles;
  private concurrentRequests = 20;
  // 100 Profiles
  // 104 Profile Progression
  // 200 Characters
  // 202 Character progression
  // 800 Collections
  // 900 Milestones
  // 1100 Metrics
  private profileComponents = [100, 104, 200, 202, 800, 900, 1100];

  // TODO: Pull this from somewhere else.
  private TRACKED_HASHES = [3902035969, 2770852111];

  constructor(private clanDb: ClanDatabase, private apiKey: string) {}

  private getProfileId(member: ClanMember) {
    return `${member.destinyUserInfo.membershipType}-${member.destinyUserInfo.membershipId}`;
  }

  private getProfileFromCache(clanId: string, member: ClanMember) {
    return this.clanDb.getById(clanId, this.tableName, this.getProfileId(member));
  }

  private getProfileFromAPI(member: ClanMember) {
    const url = `https://www.bungie.net/Platform/Destiny2/${member.destinyUserInfo.membershipType}/Profile/${
      member.destinyUserInfo.membershipId
    }/?components=${this.profileComponents.join(',')}`;

    return new Observable((observer) => {
      fetch(url, { headers: { 'X-API-Key': this.apiKey } })
        .then((response) => response.json())
        .then((data) => {
          if (!data.Response) {
            throw data;
          }
          observer.next(data);
          observer.complete();
        })
        .catch((err) => {
          console.log('error', err);
          observer.error(err);
        });
    });
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
        return this.getProfileFromAPI(member).pipe(
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

  getSerializedProfiles<T>(
    clanId: string,
    members: ClanMember[],
    collectionHashes: any[],
    profileRecords: any[],
    profileMetrics: any[]
  ): Observable<T> {
    return from(members).pipe(
      mergeMap(
        (member) => this.getSerializedProfile(clanId, member, collectionHashes, profileRecords, profileMetrics),
        100
      )
    ) as Observable<T>;
  }

  getSerializedProfilesFromCache(
    clanId: string,
    members: ClanMember[],
    collectionHashes: any[],
    profileRecords: any[],
    profileMetrics: any[]
  ): Observable<MemberProfile[]> {
    return from(members).pipe(
      mergeMap(
        (member) =>
          this.getSerializedProfileFromCache(clanId, member, collectionHashes, profileRecords, profileMetrics),
        100
      ),
      toArray()
    );
  }

  getSerializedProfilesWithProgress(
    clanId: string,
    members: ClanMember[],
    progress?: (done) => any
  ): Observable<MemberProfile[]> {
    let complete = 0;
    return from(members)
      .pipe(mergeMap((member) => this.getSerializedProfile(clanId, member, [], [], []), this.concurrentRequests))
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

  getSerializedProfile(
    clanId: string,
    member: ClanMember,
    collectionHashes: any[],
    profileRecords: any[],
    profileMetrics: any[]
  ): Observable<MemberProfile> {
    return this.getProfile(clanId, member).pipe(
      map((profile) => {
        return profileSerializer(
          profile,
          this.TRACKED_HASHES,
          collectionHashes,
          profileRecords,
          profileMetrics
        ) as MemberProfile;
      })
    );
  }
  getSerializedProfileFromCache(
    clanId: string,
    member: ClanMember,
    collectionHashes: any[],
    profileRecords: any[],
    profileMetrics: any[]
  ): Observable<MemberProfile> {
    return from(this.getProfileFromCache(clanId, member)).pipe(
      map((profile) => {
        return profileSerializer(
          profile?.data || [],
          this.TRACKED_HASHES,
          collectionHashes,
          profileRecords,
          profileMetrics
        ) as MemberProfile;
      })
    );
  }
}
