import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameReviewState } from '../types/gamereview.interface';
import { adapter } from '../reducers/game.reducers';

export const selectGameReviewFeature =
  createFeatureSelector<GameReviewState>('GameReview');
export const isLoadingGameReviewSelector = createSelector(
  selectGameReviewFeature,
  (state: GameReviewState) => state.isLoading
);

export const gameReviewSelector = createSelector(
  selectGameReviewFeature,
  adapter.getSelectors().selectAll
);

export const errorGameReviewSelector = createSelector(
  selectGameReviewFeature,
  (state: GameReviewState) => state.error
);
