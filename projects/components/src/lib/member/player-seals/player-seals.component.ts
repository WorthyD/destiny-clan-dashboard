import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlayerSealComponent } from './player-seal.component';
import { PlayerSeal } from './player-seal';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-player-seals',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, PlayerSealComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-seals.component.html',
  styleUrls: ['./player-seals.component.scss']
})
export class PlayerSealsComponent {
  gildedSeals: PlayerSeal[] = [];
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
    this.gildedSeals = seals?.filter((x) => x.gilded === true );
    this.completedSeals = seals?.filter((x) => x.complete === true && x.gilded !== true);
    this.partialSeals = seals?.filter((x) => x.complete === false);
  }
}
