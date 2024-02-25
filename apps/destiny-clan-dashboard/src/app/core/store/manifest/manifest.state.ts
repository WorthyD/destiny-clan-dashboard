import { AppState } from '@core/core.state';

export interface ManifestState {
  loading: boolean;
  loaded: boolean;
  error: any;
  isApiDown: boolean;
}

export const initialManifestState: ManifestState = {
  loading: false,
  loaded: false,
  error: null,
  isApiDown: false
};

export interface State extends AppState {
  manifest: ManifestState;
}
