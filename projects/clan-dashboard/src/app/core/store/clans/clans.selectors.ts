import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ClansState } from './clans.state';

export const selectClansState = createFeatureSelector<ClansState>('clans');
