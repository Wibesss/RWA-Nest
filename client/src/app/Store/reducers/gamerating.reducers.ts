import { createReducer, on } from '@ngrx/store';
import * as gameRatingActions from '../actions/gamerating.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GameRating } from '../types/gamerating.module';

export const adapter: EntityAdapter<GameRating> =
  createEntityAdapter<GameRating>();

export const initialState: EntityState<GameRating> = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export const ratingReducer = createReducer(
  initialState,
  on(gameRatingActions.postGameRating, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(gameRatingActions.postGameRatingSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.gameRating, state),
    };
  }),
  on(gameRatingActions.postGameRatingFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);