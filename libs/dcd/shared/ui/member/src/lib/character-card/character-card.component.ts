import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ClassTypeTextPipe, RaceTypeTextPipe } from '@dcd/shared/utils/pipes';
import { Character } from 'libs/data/src/lib/models/Character';

@Component({
  selector: 'lib-character-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MatCardModule, ClassTypeTextPipe, RaceTypeTextPipe],
  template: `
    <ng-container *ngIf="!isLoading; else loading">
      <mat-card *ngIf="character">
        <mat-card-header>
          <mat-card-title>{{ character.classType | classTypeText }} - {{ character.light }}</mat-card-title>
          <mat-card-subtitle>{{ character.raceType | raceTypeText }} </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content></mat-card-content>
      </mat-card>
    </ng-container>
    <ng-template #loading>
      <mat-card>
        <mat-card-header>
          <mat-card-title><span class="skeleton-item skeleton-title"></span></mat-card-title>
          <mat-card-subtitle><span class="skeleton-item skeleton-title"></span> </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content></mat-card-content>
      </mat-card>
    </ng-template>
  `,
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  //TODO: IDEAS TO SHOW
  /*
    time played total, time played this season, emblem, current title
  */
  @Input()
  character: Character;

  @Input()
  isLoading: boolean;
}
