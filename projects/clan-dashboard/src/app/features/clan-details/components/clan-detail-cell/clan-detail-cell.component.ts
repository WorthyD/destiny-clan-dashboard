import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsV2GroupV2 } from 'bungie-api-angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '@destiny/components/pipes';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-clan-detail-cell',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule, PipesModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clan-detail-cell.component.html',
  styleUrls: ['./clan-detail-cell.component.scss']
})
export class ClanDetailCellComponent {
  @Input() clanDetail: GroupsV2GroupV2;
  @Input() loading: boolean;
  @Input() showAdd: boolean;
  @Output() removeClan = new EventEmitter<string>();
  @Output() addClan = new EventEmitter<GroupsV2GroupV2>();
}
