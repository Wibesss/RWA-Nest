import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameRatingState } from '../types/gamerating.interface';

export const selectGameRatingFeature =
  createFeatureSelector<GameRatingState>('GameRating');

export const isLoadingRatingSelector = createSelector(
  selectGameRatingFeature,
  (state: GameRatingState) => state.isLoading
);
export const gameRatingSelector = createSelector(
    selectGameRatingFeature,
  (state: GameRatingState) => state.gamerating
);
export const errorRatingSelector = createSelector(
    selectGameRatingFeature,
  (state: GameRatingState) => state.error
);