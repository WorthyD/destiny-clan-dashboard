import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
//import {} from '@ngrx/signals/entities';
import { Player } from '@dcd/player-sidebar/models';
import { PlayerService } from './player.service';
import { computed, inject } from '@angular/core';
import { MemberProfile } from '@dcd/shared/models';

export interface MemberObj {
  membershipType: string;
  membershipId: string;
}
export interface PlayerSidebarState {
  loading: boolean;
  loaded: boolean;
  profile?: MemberProfile;
  memberObj?: MemberObj;
}

const initialState: PlayerSidebarState = {
  loading: false,
  loaded: false,
  memberObj: undefined,
  profile: undefined
};

export const PlayerSidebarStore = signalStore(
  {
    providedIn: 'root'
  },
  withState(initialState),
  withComputed((store) => ({
    selectedProfile: computed(() => {

      if (store?.memberObj) {
        return store?.memberObj();
      }
      return undefined;
    })
  })),
  withMethods((store, playerService = inject(PlayerService)) => ({
    async load(membershipType: string, membershipId: string): Promise<void> {
      patchState(store, (state) => ({ ...state, loading: true, memberObj: { membershipId, membershipType } }));

      //console.log('loading', store);
      const x = await playerService.getPlayerInfo(membershipType, membershipId);

      patchState(store, { profile: x as unknown as Player });

      patchState(store, { loading: false, loaded: true });
    },
    clear(): void {
      patchState(store, initialState);
    }
  }))
);

export type PlayerSidebarStore = InstanceType<typeof PlayerSidebarStore>;
