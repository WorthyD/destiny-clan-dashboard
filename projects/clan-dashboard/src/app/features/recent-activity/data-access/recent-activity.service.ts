import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnabledClanIds, selectEnabledClans, selectLastRecentActivityUpdate } from '@core/store/clans';
import { combineLatest, from, map, mergeMap, Observable, switchMap, take, tap, toArray } from 'rxjs';
import { ClanMemberProfile } from '@features/clans-roster/clans-roster.service';
import { ClanMembersService } from '@destiny/data/clan/clan-members';
import { ProfileService } from 'projects/data/src/lib/clan/profiles/profile.service';
import { MemberProfile } from '@destiny/data/models';
import { getClanMemberId, getMemberProfileId } from '@destiny/data/utility';
import { ProfileRecentActivityWorkerService } from '../../../workers/profile-recent-activity/profile-recent-activity.service';
import { GroupsV2GroupMember } from 'bungie-api-angular';
import { ProfileRecentActivity } from '../models/profile-recent-activity';
@Injectable()
export class RecentActivityService {
  activeClans$ = this.store.select(selectEnabledClans);
  activeClansId$ = this.store.select(selectEnabledClanIds);

  activeClanUpdateDates$: Observable<string[]> = this.activeClans$.pipe(
    switchMap((clans) => {
      const arraySelectors = clans.map((clan) => {
        return this.store.select(selectLastRecentActivityUpdate(clan.clanId));
      });

      return combineLatest(arraySelectors);
    })
  );
  clanMembers$ = this.activeClans$.pipe(
    switchMap((activeClans) => {
      return from(activeClans).pipe(
        mergeMap((clan) => {
          return this.memberService.getClanMembersSerialized(clan.clanId).pipe(
            map((result) => {
              return { clan, members: result };
            })
          );
        }),
        toArray()
      );
    })
  );
  clanProfiles$: Observable<ProfileRecentActivity[]> = this.clanMembers$.pipe(
    //clanProfiles$: Observable<ClanMemberProfile[]> = this.clanMembers$.pipe(
    switchMap((clansAndMembers) => {
      return from(clansAndMembers).pipe(
        //forkJoin((clanAndMembers) => {
        mergeMap((clanAndMembers) => {
          //switchMap((clanAndMembers) => {
          return this.profileService
            .getSerializedProfilesFromCache(clanAndMembers.clan.clanId, clanAndMembers.members, [], [])
            .pipe(
              switchMap((memberProfiles) => {
                //return of(null);
                return this.profileActivityService
                  .getAllRecentActivitiesFromCache(clanAndMembers.clan.clanId, memberProfiles)
                  .pipe(
                    take(1),
                    map((clanActivities) => {
                      return clanAndMembers.members.map((member) => {
                        return {
                          clanMember: member,
                          profileActivity: clanActivities.find(
                            (ca) => getMemberProfileId(ca.memberProfile) === getClanMemberId(member)
                          ),
                          profile: memberProfiles.find((m) => getMemberProfileId(m) === getClanMemberId(member)),
                          clan: {
                            clanId: clanAndMembers.clan.clanId,
                            clanName: clanAndMembers.clan.clanName,
                            clanTag: clanAndMembers.clan.clanTag
                          }
                        };
                      });

                      // return clanActivities.map((clanProfileActivity) => {
                      //   return {
                      //     profileActivity: clanProfileActivity,
                      //     profile: memberProfiles.find(
                      //       (m) => getMemberProfileId(m) === getMemberProfileId(clanProfileActivity.memberProfile)
                      //     ),
                      //     clan: {
                      //       clanId: clanAndMembers.clan.clanId,
                      //       clanName: clanAndMembers.clan.clanName,
                      //       clanTag: clanAndMembers.clan.clanTag
                      //     }
                      //   };
                      // });
                    })
                  );
              })
              // map((result: MemberProfile[]) => {
              //   return {
              //     clan: {
              //       clanId: clanAndMembers.clan.clanId,
              //       clanName: clanAndMembers.clan.clanName,
              //       clanTag: clanAndMembers.clan.clanTag
              //     },
              //     member: clanAndMembers.members.find(
              //       (x) => x.destinyUserInfo?.membershipId == result.profile.data.userInfo?.membershipId
              //     ),
              //     profile: result
              //   };
              // })
              // tap((x) => console.log('stuff', x))
            );
        }),
        toArray(),
        map((x) => x.flatMap((y) => y))
        // tap((x) => console.log('after array', x))
      );
    })
  );

  activeClanActivity$: Observable<ProfileRecentActivity[]> = this.activeClanUpdateDates$.pipe(
    switchMap((x) => {
      // TODO: // console.log('verify this updates properly');
      return this.clanProfiles$;

      // console.log('stuff', x);

      // return (
      //   combineLatest([this.activeClansId$, this.clanProfiles$]),
      //   map(([clans, clanDates]) => {
      //     console.log('stuff', clanDates);
      //     return clanDates;
      //   })
      // );
    })
  );

  constructor(
    private store: Store,
    private memberService: ClanMembersService,
    private profileService: ProfileService,
    private profileActivityService: ProfileRecentActivityWorkerService
  ) {}
}
