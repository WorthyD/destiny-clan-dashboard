import { BaseClanService } from './base-clan.service';
//import { ClanDatabase } from './ClanDatabase';
//import { StoreId, DBObject } from './app-indexed-db';
import { groupActivitiesByDate } from '@destiny-clan-dashboard/shared/utils';

//import { Destiny2Service, DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup } from 'bungie-api-angular';

// import { MemberProfile } from 'bungie-models';
import { mergeMap, map, catchError, toArray, switchMap, tap } from 'rxjs/operators';
import { Observable, of, from, defer, concat, EMPTY, forkJoin } from 'rxjs';
import { ClanDatabase } from './clan-database';
import { ClanDbObject, ClanStoreId } from '@dcd/shared/utils/legacy-db';
import { MemberActivityStats } from '@dcd/shared/models';
import { MemberActivityTime } from '@dcd/shared/models';
import { clanMemberActivitySerializer } from './clan-member-activity/clan-member-activity.serializer';
//import { MemberProfile } from '../models';
//import { clanMemberActivitySerializer } from './clan-member-activity/clan-member-activity.serializer';
//import { MemberProfile } from 'projects/bungie-models/src/lib/models/MemberProfile';
//import { MemberActivityTime } from 'projects/bungie-models/src/lib/models/MemberActivityTime';
//import { MemberActivityStats } from 'projects/bungie-models/src/lib/models/MemberActivityStat';
interface MemberProfile {
  profile: any;
}

interface ActivityCollection {
  activities: any[];
}
export class BaseMemberActivityService extends BaseClanService {
  private ACTIVITY_GET_COUNT = 250;
  constructor(
    private clanDbPBase: ClanDatabase,
    private tableNamePBase: ClanStoreId,
    private apiKey: string,
    // private d2ServiceBase: Destiny2Service,
    public startValue: Date,
    public maxRequestCount: number,
    public activityTypeId = 0
  ) {
    super(clanDbPBase, tableNamePBase);
  }

  public getMemberCharacterActivityFromAPI(member: MemberProfile, characterId: number, pageNumber = 0) {
    // https://www.bungie.net/Platform/Destiny2/3/Account/4611686018483900283/Character/2305843009471454818/Stats/Activities/?count=250&mode=0&page=10

    const url = `https://www.bungie.net/Platform/Destiny2/${member.profile.data.userInfo.membershipType}/Account/${member.profile.data.userInfo.membershipId}/Character/${characterId}/Stats/Activities/?count=${this.ACTIVITY_GET_COUNT}&mode=${this.activityTypeId}&page=${pageNumber}`;

    return new Observable((observer) => {
      fetch(url, { headers: { 'X-API-Key': this.apiKey } })
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });

    // return this.d2ServiceBase.destiny2GetActivityHistory(
    //   characterId,
    //   member.profile.data.userInfo.membershipId,
    //   member.profile.data.userInfo.membershipType,
    //   this.ACTIVITY_GET_COUNT,
    //   this.activityTypeId,
    //   pageNumber
    // );
  }

  private activitiesContainExpiredYear(activities, expiration) {
    if (!activities) {
      return true;
    }

    return !!activities.find((x) => {
      const activityYear = new Date(x.period);
      return activityYear <= expiration;
    });
  }

  private getAllRecentActivity(member: MemberProfile, characterId: number): Observable<ActivityCollection> {
    const maxConcurrentCount = 4;
    const fetchPage = (page = 0) => {
      return this.getMemberCharacterActivityFromAPI(member, characterId, page).pipe(
        map((x: any) => {
          const nextPage =
            this.activitiesContainExpiredYear(x?.Response?.activities, this.startValue) || page >= this.maxRequestCount
              ? null
              : page + maxConcurrentCount;

          const activities = x?.Response?.activities || [];
          return { activities, nextPage };
        })
      );
    };

    const getItems = (page) =>
      defer(() => fetchPage(page)).pipe(
        mergeMap(({ activities, nextPage }) => {
          const items$ = from(activities);
          const next$ = nextPage ? getItems(nextPage) : EMPTY;
          return concat(items$, next$);
        })
      );

    const batchedRequest = [];
    for (let i = 0; i < maxConcurrentCount; i++) {
      batchedRequest.push(getItems(i).pipe(toArray()));
    }

    return forkJoin(batchedRequest).pipe(
      map((x: any) => {
        return {
          activities: x.flat()
        };
      })
    );
  }

  getMemberActivityId(member: MemberProfile, characterId: number) {
    return `${this.getMemberProfileId(member)}-${characterId}`;
  }
  getMemberProfileId(member: MemberProfile) {
    return `${member.profile.data.userInfo.membershipType}-${member.profile.data.userInfo.membershipId}`;
  }

  /**
   *  Pulls character activity from cache and will return fresh data if cache is exipred
   */
  getMemberCharacterActivity(
    clanId: number,
    member: MemberProfile,
    characterId: number,
    useCache: boolean

    // ): Observable<Array<DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup>> {
  ): Observable<Array<any>> {
    const characterActivityId = this.getMemberActivityId(member, characterId);

    return from(this.getDataFromCache(clanId.toString(), characterActivityId)).pipe(
      mergeMap((cachedData) => {
        // if (this.isCacheValid(cachedData, 720, new Date(member.profile.data.dateLastPlayed))) {
        //   return of(cachedData.data);
        // }

        // return this.getFreshMemberCharacterActivity(clanId, member, characterId, characterActivityId, cachedData);

        if (useCache) {
          return this.verifyCacheIntegrity(clanId, member, characterId, cachedData);
        }
        return of(cachedData.data);
      })
    );
  }

  /**
   * Determines if Cached data is fresh enough to use. Triggers new call if too old.
   *
   */
  verifyCacheIntegrity(clanId, memberProfile: MemberProfile, characterId, cachedData: ClanDbObject) {
    const characterActivityId = this.getMemberActivityId(memberProfile, characterId);
    if (this.isCacheValid(cachedData, 720, new Date(memberProfile.profile.data.dateLastPlayed))) {
      return of(cachedData.data);
    }

    return this.getFreshMemberCharacterActivity(clanId, memberProfile, characterId, characterActivityId, cachedData);
  }

  /**
   * Calls for fresh character activity. Updates cache. Falls back on cache on failure.
   */
  getFreshMemberCharacterActivity(
    clanId: string,
    member: MemberProfile,
    characterId: number,
    characterActivityId: string,
    cachedData: ClanDbObject
    //): Observable<Array<DestinyHistoricalStatsDestinyHistoricalStatsPeriodGroup>> {
  ): Observable<Array<any>> {
    return this.getAllRecentActivity(member, characterId).pipe(
      map((activityResponse) => {
        if (activityResponse.activities) {
          // serialize:
          const slimmedActivities = activityResponse.activities.map((x) => {
            return clanMemberActivitySerializer(x);
          });

          this.updateDB(clanId, characterActivityId, slimmedActivities);
          return slimmedActivities;
        }
        return of([]);
      }),
      catchError((error) => {
        if (error.error?.ErrorStatus === 'DestinyPrivacyRestriction') {
          this.updateDB(clanId, characterActivityId, []);
          return of([]);
        }
        if (cachedData && cachedData.data) {
          return of(cachedData.data);
        }

        throw error;
      })
    );
  }

  groupActivitiesToMember(
    memberProfile: MemberProfile,
    allActivities: ClanDbObject[],
    activityMode: number = 0,
    activityTypeId: number = 0
  ) {
    if (!memberProfile) {
      return undefined;
    }
    const memberProfileId = `${memberProfile.profile.data.userInfo.membershipType}-${memberProfile.profile.data.userInfo.membershipId}`;

    const memberActivitiesDB = allActivities.filter((x) => x.id.startsWith(memberProfileId));

    const memberActivitiesSerialized = memberActivitiesDB.map((activityDB) =>
      activityDB.data.map((activity) => clanMemberActivitySerializer(activity))
    );

    const allFilteredModeActivities =
      activityMode > 0
        ? memberActivitiesSerialized.map((items) =>
            items.filter((a) => a.activityDetails.modes.indexOf(activityMode) > -1)
          )
        : memberActivitiesSerialized;

    const allFilteredTypeActivities =
      activityTypeId > 0
        ? allFilteredModeActivities.map((items) =>
            items.filter((a) => a.activityDetails.directorActivityHash === activityTypeId)
          )
        : allFilteredModeActivities;

    const timed = groupActivitiesByDate([].concat(...allFilteredTypeActivities));

    return {
      id: memberProfileId,
      activities: timed
    };
  }

  groupActivitiesToMembers(
    memberProfiles: MemberProfile[],
    allActivities: ClanDbObject[],
    activityMode: number = 0,
    activityTypeId = 0
  ): any[] {
    return memberProfiles
      .filter((m) => !!m)
      .map((memberProfile) => {
        return this.groupActivitiesToMember(memberProfile, allActivities, activityMode, activityTypeId);
      });
  }

  getAllActivitiesFromCache(
    clanId: number,
    memberProfiles: MemberProfile[],
    activityMode = 0,
    activityTypeId = 0
  ): Observable<MemberActivityTime[]> {
    return from(this.getAllDataFromCache(clanId.toString())).pipe(
      map((x) => {
        const y = this.groupActivitiesToMembers(memberProfiles, x, activityMode, activityTypeId);
        return y;
      })
    );
  }
  // TODO: Turn this up to 11
  updateAllActivityCache(clanId: number, memberProfiles: MemberProfile[], progress?: (done) => any) {
    const memberProfilesObs = from(memberProfiles);
    const cacheDataObs = from(this.getAllDataFromCache(clanId.toString()));

    return cacheDataObs.pipe(
      switchMap((cachedData) => {
        let complete = 0;
        return memberProfilesObs.pipe(
          mergeMap((memberProfile) => {
            if (!memberProfile?.profile?.data?.characterIds) {
              return of();
            }
            return from(memberProfile.profile.data.characterIds).pipe(
              mergeMap((characterId: number) => {
                const characterActivityId = this.getMemberActivityId(memberProfile, characterId);
                const characterActivityCache = cachedData.find((x) => x.id === characterActivityId);

                return this.verifyCacheIntegrity(clanId, memberProfile, characterId, characterActivityCache);
              }),
              toArray(),
              map((x) => {
                const memberProfileId = `${memberProfile.profile.data.userInfo.membershipType}-${memberProfile.profile.data.userInfo.membershipId}`;
                return {
                  id: memberProfileId
                };
              })
            );
          }, 3),
          tap((x) => {
            complete++;
            if (progress) {
              progress(complete);
            }
          }),
          toArray()
        );
      })
    );
  }
  getMemberActivity(
    clanId: number,
    member: any,
    useCache: boolean,
    activityMode: number = 0,
    activityType: number = 0
  ): Observable<MemberActivityStats> {
    if (!member?.profile) {
      return of(null);
    }
    return from(member.profile.data.characterIds).pipe(
      mergeMap((characterId: number) => {
        return this.getMemberCharacterActivitySerialized(
          clanId,
          member,
          characterId,
          useCache,
          activityMode,
          activityType
        );
      }),
      map((x) => {
        return x.activities;
      }),
      toArray(),
      map((x) => {
        return {
          id: `${member.profile.data.userInfo.membershipType}-${member.profile.data.userInfo.membershipId}`,
          activities: [].concat(...x)
        };
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }
  getMemberCharacterActivitySerialized(
    clanId: number,
    member: MemberProfile,
    characterId: number,
    useCache: boolean,
    activityMode: number = 0,
    activityHash: number = 0
  ) {
    return this.getMemberCharacterActivity(clanId, member, characterId, useCache).pipe(
      map((activity) => {
        if (activityMode > 0) {
          activity = activity.filter((a) => a.activityDetails.modes.indexOf(activityMode) > -1);
        }
        if (activityHash > 0) {
          activity = activity.filter((a) => a.activityDetails.directorActivityHash === activityHash);
        }

        return {
          activities: activity.map((a) => clanMemberActivitySerializer(a))
        };
      })
    );
  }
}
