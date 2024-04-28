import { map, catchError, mergeMap, bufferTime, toArray } from 'rxjs/operators';
import { Observable, from, of, throwError } from 'rxjs';
// import { profileSerializer } from './profile.serializer';
import { isValidDate, nowPlusDays, unixTimeStampToDate } from '@destiny-clan-dashboard/shared/utils';
import { ClanStoreId } from '@dcd/shared/utils/legacy-db';
import { ClanDatabase } from '../clan-database';
import { ClanMember } from '@dcd/shared/models';
import { BungieInfo } from '@dcd/shared/models';
//import { BungieInfo } from '../../models/BungieInfo';
interface MemberProfile {}

export class ClanBungieInfoService {
  private tableName: ClanStoreId = ClanStoreId.BungieInfo;
  private concurrentRequests = 20;
  private CACHE_EXPIRATION = -1;

  constructor(private clanDb: ClanDatabase, private apiKey: string) {}

  private getProfileId(member: ClanMember) {
    return `${member.destinyUserInfo.membershipType}-${member.destinyUserInfo.membershipId}`;
  }
  private getBungieNetMembershipId(member: ClanMember) {
    return member.bungieNetUserInfo.membershipId;
  }

  private getBungieInfoFromCache(clanId: string, member: ClanMember) {
    return this.clanDb.getById(clanId, this.tableName, this.getProfileId(member));
  }

  private getBungieInfoFromAPI(member: ClanMember) {
    if (member?.bungieNetUserInfo?.membershipId) {
      const url = `https://www.bungie.net/Platform/User/GetBungieNetUserById/${this.getBungieNetMembershipId(member)}/`;
      // https://www.bungie.net/Platform/User/GetBungieNetUserById/612698/

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
    return of(null);
  }

  getBungieInfo(clanId: string, member: ClanMember): Observable<BungieInfo> {
    return from(this.getBungieInfoFromCache(clanId, member)).pipe(
      mergeMap((cachedData) => {
        if (cachedData && cachedData.createDate) {
          const cacheDate = cachedData.createDate;
          const lastStatusChange = unixTimeStampToDate(member.lastOnlineStatusChange);
          const staleXP = nowPlusDays(this.CACHE_EXPIRATION);
          // Make sure we recapture new data after season change
          const expireDate = !isValidDate(lastStatusChange) || staleXP > lastStatusChange ? staleXP : lastStatusChange;

          if (cacheDate > expireDate) {
            return of(cachedData?.data);
          }
        }
        return this.getBungieInfoFromAPI(member).pipe(
          map((memberProfileResponse: any) => {
            if (memberProfileResponse?.Response) {
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

  // getSerializedBungieInfos<T>(clanId: string, members: ClanMember[]): Observable<T> {
  //   return from(members).pipe(mergeMap((member) => this.getSerializedBungieInfo(clanId, member), 100)) as Observable<T>;
  // }

  getSerializedBungieInfosWithProgress(
    clanId: string,
    members: ClanMember[],
    progress?: (done) => any
  ): Observable<BungieInfo[]> {
    let complete = 0;
    return from(members)
      .pipe(mergeMap((member) => this.getSerializedBungieInfo(clanId, member), this.concurrentRequests))
      .pipe(
        bufferTime(1000, undefined, 100),
        /**
         * Don't continue processing if the timer in `bufferTime` was reached and
         *   there are no buffered members.
         */
        mergeMap((memberResp) => {
          complete += memberResp.length;
          if (progress) {
            // console.log('progress', complete);
            progress(complete);
          }
          return memberResp;
        }),
        toArray()
      );
  }

  private getSerializedBungieInfo(clanId: string, member: ClanMember): Observable<BungieInfo> {
    return this.getBungieInfo(clanId, member).pipe(
      map((profile) => {
        return profile;
      })
    );
  }

  getSerializedBungieInfosFromCache(clanId: string, members: ClanMember[]): Observable<BungieInfo[]> {
    return from(members).pipe(
      mergeMap((member) => this.getSerializedBungieInfoFromCache(clanId, member), 100),
      toArray()
    );
  }

  getSerializedBungieInfoFromCache(clanId: string, member: ClanMember): Observable<BungieInfo> {
    return from(this.getBungieInfoFromCache(clanId, member)).pipe(
      map((profile) => {
        return profile?.data || [];
      })
    );
  }
}
