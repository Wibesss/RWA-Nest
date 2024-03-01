import { createAction, props } from '@ngrx/store';
import { GameRatingModel } from '../types/gamerating.module';

export const postGameRating = createAction(
  '[Game Rating page] Post Game Rating',
  props<{
    gameRating: GameRatingModel;
    id: number;
    userId: number;
  }>()
);

export const postGameRatingSuccess = createAction(
  '[Game Rating page] Post Game Rating Success',
  props<{
    gameRating: GameRatingModel;
  }>()
);

export const postGameRatingFailure = createAction(
  '[Game Rating page] Post Game Rating Failure',
  props<{ error: string }>()
);
