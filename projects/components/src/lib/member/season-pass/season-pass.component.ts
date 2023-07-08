import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ClanMemberSeasonPassProgression } from 'projects/data/src/lib/models/ClanMemberSeasonPass';

@Component({
  selector: 'lib-season-pass',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatCardModule, MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './season-pass.component.html',
  styleUrls: ['./season-pass.component.scss']
})
export class SeasonPassComponent {
  @Input()
  subTitle: string;

  @Input()
  clanMemberSeasonPass: ClanMemberSeasonPassProgression;

  @Input()
  isLoading: boolean;

  get seasonPassProgress() {
    return this.clanMemberSeasonPass?.progression?.level + this.clanMemberSeasonPass?.prestigeProgression?.level;
  }

  get seasonPassProgressBarValue() {
    return (this.clanMemberSeasonPass?.progression?.level / this.clanMemberSeasonPass?.progression?.levelCap) * 100;
  }
}
