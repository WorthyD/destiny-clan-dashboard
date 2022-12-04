import { AppState } from '@core/core.state';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ClanConfig {
  clanId: string;
  clanName: string;
  clanTag: string;
  enabled: boolean;
  memberUpdate: string;
  profileUpdate: string;
  memberRecentActivityUpdate: string;
}

export interface ClansState extends EntityState<ClanConfig> {}

export const ClanConfigAdapter: EntityAdapter<ClanConfig> = createEntityAdapter<ClanConfig>({
  selectId: (cc: ClanConfig) => cc.clanId,
  sortComparer: false
});

export const initialClanState: ClansState = ClanConfigAdapter.getInitialState({});

export interface State extends AppState {
  clans: ClansState;
}

export const DefaultClanConfig: ClanConfig = {
  enabled: true
} as ClanConfig;
