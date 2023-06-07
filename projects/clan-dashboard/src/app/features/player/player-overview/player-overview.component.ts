import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { PlayerService } from '../data-access/player.service';
import { BungieInfoService } from 'projects/data/src/lib/profile/bungie-info.service';
import { BungieInfo } from '@destiny/data/models';
interface MemberInfo {
  memberType: string;
  memberId: string;
}
@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent {
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,

    private bungieInfoService: BungieInfoService
  ) {}
  memberInfo$: Observable<MemberInfo> = this.route.paramMap.pipe(
    map((params) => {
      const playerInfo = params.get('player-id');
      return { memberType: playerInfo.split('-')[0], memberId: playerInfo.split('-')[1] };
    })
  );

  profile$ = this.memberInfo$.pipe(
    switchMap((memberInfo) => this.playerService.getProfile(memberInfo.memberType, memberInfo.memberId)),
  );

  bungieInfoLoadingSource$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  bungieInfoLoading$ = this.bungieInfoLoadingSource$.asObservable();
  bungieInfo$ = this.profile$.pipe(
    filter((profile) => !!profile),
    switchMap((profile) => {
      this.bungieInfoLoadingSource$.next(true);
      return this.bungieInfoService.getBungieInformation(
        profile.profile.data.userInfo.membershipType,
        profile.profile.data.userInfo.membershipId
      );
    }),
    map((response) => {
      this.bungieInfoLoadingSource$.next(false);
      return response.Response as BungieInfo;
    })
  );
}
