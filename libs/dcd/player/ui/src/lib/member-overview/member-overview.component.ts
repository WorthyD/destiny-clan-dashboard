import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberProfile } from '@dcd/shared/models';
import { MatCardModule } from '@angular/material/card';
import { BungieDateTimePipe } from '@dcd/shared/utils/pipes';
import {
  MemberTypeIconComponent,
  CharacterCardComponent,
  SeasonPassComponent,
  BungieInfoComponent
} from '@dcd/shared/ui/member';

import { Character } from '@dcd/shared/models';
import { ClanMemberSeasonPassProgression } from '@dcd/shared/models';
import { SeasonService } from '@dcd/shared/data-access/definitions';
// import { Observable } from 'rxjs';
// import { GlobalSealsService } from '@core/services/global-seals.service';
// import { DefinitionService } from '@core/definition-services/definition.service';

@Component({
  selector: 'dcd-member-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BungieDateTimePipe,
    MemberTypeIconComponent,
    CharacterCardComponent,
    SeasonPassComponent,
    BungieInfoComponent
    // PlayerSealsComponent
  ],
  templateUrl: './member-overview.component.html',
  styleUrls: ['./member-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberOverviewComponent implements OnChanges {
  @Input()
  memberOverview!: MemberProfile;
  @Input()
  isLoading!: boolean;

  characters: Character[] = [];
  seasonPass: ClanMemberSeasonPassProgression | undefined;
  lastSeasonPass: ClanMemberSeasonPassProgression | undefined;
  memberSealInfo = undefined;

  constructor(private seasonService: SeasonService) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['memberOverview']) {
      this.characters = this.memberOverview?.profile?.data?.characterIds?.map((id) => {
        return this.memberOverview.characters.data[id];
      })!;

      const currentSeason = this.seasonService.currentSeasonProgress;
      const lastSeason = this.seasonService.lastSeasonProgress;
      const characterId = this.memberOverview?.profile?.data?.characterIds?.[0] || 0;

      if (characterId > 0 && this.memberOverview?.characterProgressions?.data[characterId]?.progressions) {
        const characterProgressions = this.memberOverview?.characterProgressions?.data[characterId].progressions;
        this.seasonPass = {
          progression: characterProgressions[currentSeason!.rewardProgressionHash!],
          prestigeProgression: characterProgressions[currentSeason!.prestigeProgressionHash!]
        };
        this.lastSeasonPass = {
          progression: characterProgressions[lastSeason!.rewardProgressionHash!],
          prestigeProgression: characterProgressions[lastSeason!.prestigeProgressionHash!]
        };
      }
    }
  }
}
