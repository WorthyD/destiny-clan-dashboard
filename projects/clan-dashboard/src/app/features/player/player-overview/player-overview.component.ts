import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PlayerService } from '../data-access/player.service';
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
  constructor(private route: ActivatedRoute, private playerService: PlayerService) {}
  memberInfo$: Observable<MemberInfo> = this.route.paramMap.pipe(
    map((params) => {
      const playerInfo = params.get('player-id');
      return { memberType: playerInfo.split('-')[0], memberId: playerInfo.split('-')[1] };
    })
  );

  profile$ = this.memberInfo$.pipe(
    map((memberInfo) => this.playerService.getProfile(memberInfo.memberType, memberInfo.memberId))
  );
}
