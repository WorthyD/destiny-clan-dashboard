import { AppState } from '@core/core.state';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ClanConfig {
  clanId: string;
  enabled: boolean;
}

export interface ClansState extends EntityState<ClanConfig> {}

export const ClanConfigAdapter: EntityAdapter<ClanConfig> = createEntityAdapter<ClanConfig>({
  selectId: (cc: ClanConfig) => cc.clanId,
  sortComparer: false
});

export const initialClanState: ClansState = ClanConfigAdapter.getInitialState({});

// export const initialClanState: ClansState = {
//   clans: []
// };

export interface State extends AppState {
  clans: ClansState;
}

export const DefaultClanConfig: ClanConfig = {
  enabled: true
} as ClanConfig;