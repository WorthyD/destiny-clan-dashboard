import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MemberTypeIconComponent,
  CharacterCardComponent,
  SeasonPassComponent,
  BungieInfoComponent,
  MemberSharedOverviewComponent
} from '@dcd/shared/ui/member';
import {PlayerSidebarStore} from '@dcd/player-sidebar/data-access';
import { MemberProfile } from '@dcd/shared/models';

@Component({
  selector: 'dcd-player-sidebar',
  standalone: true,
  imports: [CommonModule, MemberSharedOverviewComponent],
  templateUrl: './player-sidebar.component.html',
  styleUrl: './player-sidebar.component.scss'
})
export class PlayerSidebarComponent {
  readonly store = inject(PlayerSidebarStore);
  //constructor(private readonly playerSidebarStore:PlayerSidebarStore){}

  // memberOverview = this.playerSidebarStore.profile!() as MemberProfile;
  // isLoading = this.playerSidebarStore.loading();
}
