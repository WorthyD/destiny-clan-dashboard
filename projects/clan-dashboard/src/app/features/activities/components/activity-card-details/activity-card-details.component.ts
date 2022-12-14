import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinyDefinitionsDestinyActivityDefinition } from 'bungie-api-angular';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-activity-card-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './activity-card-details.component.html',
  styleUrls: ['./activity-card-details.component.scss']
})
export class ActivityCardDetailsComponent {
  @Input() activityDefinition: DestinyDefinitionsDestinyActivityDefinition;
  @Input() title: string;
  @Input() itemTemplate: TemplateRef<HTMLElement>;
  @Output() viewActivity = new EventEmitter<number>();
}
