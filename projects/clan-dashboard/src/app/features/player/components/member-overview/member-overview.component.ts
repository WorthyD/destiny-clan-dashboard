import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberProfile } from '@destiny/data/models';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '@destiny/components/pipes';
import { MemberTypeIconComponent } from '@destiny/components/shared/member-type-icon';
import { CharacterCardComponent } from '@destiny/components/shared/character-card';
import { Character } from 'projects/data/src/lib/models/Character';

@Component({
  selector: 'app-member-overview',
  standalone: true,
  imports: [CommonModule, MatCardModule, PipesModule, MemberTypeIconComponent, CharacterCardComponent],
  templateUrl: './member-overview.component.html',
  styleUrls: ['./member-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberOverviewComponent {
  @Input()
  memberOverview: MemberProfile;

  characters: Character[];

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['memberOverview']) {
      this.characters = this.memberOverview?.profile?.data?.characterIds.map((id) => {
        return this.memberOverview.characters.data[id];
      });
    }
  }
}
