import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlayerSealComponent } from './player-seal.component';
import { PlayerSeal } from './player-seal';

@Component({
  selector: 'lib-player-seals',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, PlayerSealComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-seals.component.html',
  styleUrls: ['./player-seals.component.scss']
})
export class PlayerSealsComponent {
  guildedSeals: PlayerSeal[] = [];
  completedSeals: PlayerSeal[] = [];
  partialSeals: PlayerSeal[] = [];
  _playerSeals;

  @Input()
  get playerSeals(): PlayerSeal[] {
    return this._playerSeals;
  }
  set playerSeals(value) {
    this._playerSeals = value;
    this.applySeals(value);
  }

  applySeals(seals: PlayerSeal[]) {
    this.guildedSeals = seals?.filter((x) => x.guilded === true && x.complete === true);
    this.completedSeals = seals?.filter((x) => x.complete === true && x.guilded === false);
    this.partialSeals = seals?.filter((x) => x.complete === false && x.guilded === false);
  }
}
