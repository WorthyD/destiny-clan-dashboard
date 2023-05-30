import { Component, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '../../pipes';
import { Character } from 'projects/data/src/lib/models/Character';

@Component({
  selector: 'lib-character-card',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatCardModule, PipesModule],
  template: `
    <mat-card *ngIf="character">
      <mat-card-title>{{ character.classType | classTypeText }} - {{ character.light }}</mat-card-title>
      <mat-card-subtitle
        >{{ character.raceType | raceTypeText }} - {{ character.genderType | genderTypeText }}
      </mat-card-subtitle>
    </mat-card>
  `,
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input()
  character: Character;
}
