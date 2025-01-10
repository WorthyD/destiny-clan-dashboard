import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MemberTypeIconComponent,
  CharacterCardComponent,
  SeasonPassComponent,
  BungieInfoComponent,
  MemberSharedOverviewComponent,
  PlayerSnapshotComponent
} from '@dcd/shared/ui/member';
import { PlayerSidebarStore } from '@dcd/player-sidebar/data-access';
import { Character, MemberProfile } from '@dcd/shared/models';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';

import { RouterModule } from '@angular/router';
import { ProfileUrlPipe } from '@dcd/shared/utils/pipes';
import { BungieDisplayNamePipe } from "../../../../../shared/utils/pipes/src/lib/bungie-display-name/bungie-display-name.pipe";

@Component({
  selector: 'dcd-player-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MemberSharedOverviewComponent,
    CharacterCardComponent,
    MatIcon,
    MatIconButton,
    MatButtonModule,
    RouterModule,
    ProfileUrlPipe,
    BungieDisplayNamePipe,
    PlayerSnapshotComponent
],
  templateUrl: './player-sidebar.component.html',
  styleUrl: './player-sidebar.component.scss'
})
export class PlayerSidebarComponent {
  @Output() closeSidebar = new EventEmitter();

  readonly store = inject(PlayerSidebarStore);
  // characters: Character[] = [];

  profile = this.store.profile!();
  characters = computed(() => {
    const p = this.store.profile!();
    if (p) {
      return p.profile?.data?.characterIds?.map((id) => {
        return p.characters.data[id];
      });
    }
    return [];
  });

  //constructor(private readonly playerSidebarStore:PlayerSidebarStore){}

  // memberOverview = this.playerSidebarStore.profile!() as MemberProfile;
  // isLoading = this.playerSidebarStore.loading();
}
