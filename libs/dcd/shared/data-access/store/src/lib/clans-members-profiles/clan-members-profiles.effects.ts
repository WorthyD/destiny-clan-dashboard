// import { Injectable } from '@angular/core';
// import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { map, switchMap } from 'rxjs/operators';
// import * as clanActions from '../clans/clans.actions';
// import { ClansMembersService } from '@core/services/clans-members.service';
// import { setClanMemberProfiles, initializeClanMemberProfiles } from './clan-members-profiles.actions';
// import { getClanMemberId } from '@destiny-clan-dashboard/data/utility';
// import { selectClansState, selectEnabledClans } from '../clans/clans.selectors';

// @Injectable()
// export class ClansMembersProfilesEffects {
//   constructor(private actions$: Actions, private store: Store, private memberService: ClansMembersService) {}

//   // setClanMemberProfiles$ = createEffect(() => {
//   //   return this.actions$.pipe(
//   //     ofType(clanActions.initializeClanItems, clanActions.updateClanProfileSync),
//   //     concatLatestFrom(() => this.store.select(selectEnabledClans)),
//   //     switchMap(([action, clans]) => {
//   //       return this.memberService.getActiveClanMembers(clans).pipe(
//   //         map((activeClanMembersProfiles) => {
//   //           return setClanMemberProfiles({
//   //             clanMemberProfiles: activeClanMembersProfiles.map((x) => ({
//   //               id: getClanMemberId(x.member),
//   //               ...x
//   //             }))
//   //           });
//   //         })
//   //       );

//   //       // // TODO. Propper get request
//   //       // console.log('stuff');
//   //       // return this.memberService.clanProfiles$.pipe(
//   //       //   map((activeClanMembersProfiles) => {
//   //       //     return setClanMemberProfiles({
//   //       //       clanMemberProfiles: activeClanMembersProfiles.map((x) => ({
//   //       //         id: getClanMemberId(x.member),
//   //       //         ...x
//   //       //       }))
//   //       //     });
//   //       //   })
//   //       // );
//   //     })
//   //   );
//   // });
// }
