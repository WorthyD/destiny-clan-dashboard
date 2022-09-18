import { AppState } from '@core/core.state';

export interface ClansState {
  clans: string[];
}

export const initialClanState: ClansState = {
  clans : []
};

export interface State extends AppState {
  clans: ClansState;
}
