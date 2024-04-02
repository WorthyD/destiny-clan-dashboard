import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seal-member-progress-table',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './seal-member-progress-table.component.html',
  styleUrls: ['./seal-member-progress-table.component.scss']
})
export class SealMemberProgressTableComponent {

}
