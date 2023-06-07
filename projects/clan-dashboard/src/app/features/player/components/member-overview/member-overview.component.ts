import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BungieInfo, MemberProfile } from '@destiny/data/models';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '@destiny/components/pipes';
import { MemberTypeIconComponent } from '@destiny/components/member/member-type-icon';
import { CharacterCardComponent } from '@destiny/components/member/character-card';
import { SeasonPassComponent } from '@destiny/components/member/season-pass';
import { BungieInfoComponent } from '@destiny/components/member/bungie-info';
import {PlayerSealsComponent, convertSealAndProfile  } from '@destiny/components/member/player-seals';


import { Character } from 'projects/data/src/lib/models/Character';
import { ClanMemberSeasonPassProgression } from 'projects/data/src/lib/models/ClanMemberSeasonPass';
import { SeasonService } from '@core/services/season.service';
import { Observable } from 'rxjs';
import { GlobalSealsService } from '@core/services/global-seals.service';

@Component({
  selector: 'app-member-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    PipesModule,
    MemberTypeIconComponent,
    CharacterCardComponent,
    SeasonPassComponent,
    BungieInfoComponent,
    PlayerSealsComponent
  ],
  templateUrl: './member-overview.component.html',
  styleUrls: ['./member-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberOverviewComponent implements OnChanges {
  @Input()
  memberOverview: MemberProfile;

  @Input()
  bungieInfo$: Observable<BungieInfo>;

  @Input()
  bungieInfoLoading$: Observable<boolean>;

  characters: Character[];
  seasonPass: ClanMemberSeasonPassProgression;
  lastSeasonPass: ClanMemberSeasonPassProgression;
  memberSealInfo;

  constructor(private seasonService: SeasonService, private globalSealsService: GlobalSealsService) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['memberOverview']) {
      this.characters = this.memberOverview?.profile?.data?.characterIds.map((id) => {
        return this.memberOverview.characters.data[id];
      });

      const currentSeason = this.seasonService.currentSeasonProgress;
      const lastSeason = this.seasonService.lastSeasonProgress;
      const characterId = this.memberOverview?.profile?.data?.characterIds[0];

      if (characterId > 0 && this.memberOverview?.characterProgressions?.data[characterId]?.progressions) {
        const characterProgressions = this.memberOverview?.characterProgressions?.data[characterId].progressions;
        this.seasonPass = {
          progression: characterProgressions[currentSeason.rewardProgressionHash],
          prestigeProgression: characterProgressions[currentSeason.prestigeProgressionHash]
        };

        this.lastSeasonPass = {
          progression: characterProgressions[lastSeason.rewardProgressionHash],
          prestigeProgression: characterProgressions[lastSeason.prestigeProgressionHash]
        };

        console.log(this.globalSealsService.sealNodesWLegacy);
        this.memberSealInfo = convertSealAndProfile(this.globalSealsService.sealNodesWLegacy, this.memberOverview);
      }
    }
  }
}
