import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberProfile } from '@destiny/data/models';
import { BungieDisplayNameModule } from '../../pipes/bungie-display-name';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'lib-profile-link',
  standalone: true,
  imports: [CommonModule, BungieDisplayNameModule, RouterModule],
  templateUrl: './profile-link.component.html',
  styleUrls: ['./profile-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileLinkComponent {
  @Input()
  profile: MemberProfile;
}
