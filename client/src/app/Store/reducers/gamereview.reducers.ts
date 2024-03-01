import { createReducer, on } from '@ngrx/store';
import * as gameReviewActions from '../actions/gamereview.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GameReview } from '../types/gamereview.module';

export const adapter: EntityAdapter<GameReview> =
  createEntityAdapter<GameReview>();

export const initialState: EntityState<GameReview> = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export const reviewReducer = createReducer(
  initialState,
  on(gameReviewActions.postGameReview, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(gameReviewActions.postGameReviewSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.review, state),
    };
  }),
  on(gameReviewActions.postGameReviewFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(gameReviewActions.getGameReviews, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(gameReviewActions.getGameReviewsSuccess, (state, action) => {
    return adapter.setAll(action.reviews, { ...state, isLoading: false });
  }),
  on(gameReviewActions.getGameReviewFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(gameReviewActions.deleteReview, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(gameReviewActions.deleteReviewSuccess, (state, action) => {
    return adapter.removeOne(action.id, { ...state, isLoading: false });
  }),
  on(gameReviewActions.deleteReviewFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
