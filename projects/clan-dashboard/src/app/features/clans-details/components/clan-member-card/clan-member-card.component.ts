import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-clan-member-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clan-member-card.component.html',
  styleUrls: ['./clan-member-card.component.scss']
})
export class ClanMemberCardComponent {
  @Input()
  cardTitle: string;

  @Input()
  members: ClanMemberProfile[];

  @Input()
  isLoading: boolean;

  @Input() itemTemplate: TemplateRef<HTMLElement>;
}
