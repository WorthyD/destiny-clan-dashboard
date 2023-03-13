import { Injectable } from '@angular/core';
import { createStore, UseStore } from 'idb-keyval';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';
import { IdbKeyValService } from '../storage';
import { nowPlusDays, unixTimeStampToDate } from '../utility/date-utils';
import { ProfileService } from './profile.service';
import { MemberProfile } from '../models/MemberProfile';

export class CachedProfileService extends ProfileService {
  profileStore: UseStore;
  constructor(private idbKeyValService: IdbKeyValService, private apiKey: string) {
    super(apiKey);
    this.profileStore = createStore('D2Dashboard-profiles', 'data');
  }
  private getStorageId(membershipType, membershipId) {
    return `${membershipType}-${membershipId}`;
  }
  private getProfileFromCache(membershipType, membershipId) {
    return this.idbKeyValService.get(this.getStorageId(membershipType, membershipId), this.profileStore);
  }

  getProfile(membershipType, membershipId): Observable<MemberProfile> {
    console.log(`${membershipType}${membershipId}`)
    return from(this.getProfileFromCache(membershipType, membershipId)).pipe(
      mergeMap((cachedData) => {
        console.log('cached', cachedData);
        if (cachedData && cachedData.createDate) {
          const cacheDate = cachedData.createDate;
          //const lastStatusChange = unixTimeStampToDate(member.lastOnlineStatusChange);
          const staleXP = nowPlusDays(-1);
          // Make sure we recapture new data after season change
          //const expireDate = staleXP > lastStatusChange ? staleXP : lastStatusChange;

          if (cacheDate > staleXP) {
            return of(cachedData?.data);
          }
        }
        return this.getProfileFromAPI(membershipType, membershipId).pipe(
          map((memberProfileResponse: any) => {
            if (memberProfileResponse.Response) {
              this.idbKeyValService.set(
                this.getStorageId(membershipType, membershipId),
                [
                  {
                    id: this.getStorageId(membershipType, membershipId),
                    createDate: new Date(),
                    data: memberProfileResponse.Response
                  }
                ],
                this.profileStore
              );

              return memberProfileResponse.Response;
            }
          }),
          catchError((error) => {
            if (cachedData && cachedData.data) {
              return of(cachedData.data);
            }
            if (error?.ErrorStatus === 'DestinyAccountNotFound') {
              console.error(`Error retrieving profile, not found`, this.getStorageId(membershipType, membershipId));
              return of();
            }
            if (error?.ErrorStatus === 'DestinyUnexpectedError') {
              console.error(`Error retrieving profile`, this.getStorageId(membershipType, membershipId));
              return of();
            }

            throw error;
          })
        );
      })
    );
  }
}
