import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsV2GroupV2 } from 'bungie-api-angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {BungieDatePipe} from '@destiny-clan-dashboard/shared/pipes/bungie-date-pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'dcd-clan-detail-cell',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule, BungieDatePipe, MatIconModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clan-detail-cell.component.html',
  styleUrls: ['./clan-detail-cell.component.scss']
})
export class ClanDetailCellComponent {
  @Input() clanDetail: GroupsV2GroupV2 | undefined = undefined;
  @Input() loading: boolean = false;
  @Input() showAdd: boolean = false;
  @Input() showReset: boolean = false;
  @Output() removeClan = new EventEmitter<string>();
  @Output() addClan = new EventEmitter<GroupsV2GroupV2>();
  @Output() resetClan = new EventEmitter<GroupsV2GroupV2>();
}
