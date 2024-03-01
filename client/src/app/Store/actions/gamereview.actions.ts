import { createAction, props } from '@ngrx/store';
import { GameReviewModel } from '../types/gamereview.module';

export const postGameReview = createAction(
  '[Game Review page] Post Game Review',
  props<{
    review: GameReviewModel ;
    id: number;
    userId: number;
  }>()
);
export const postGameReviewSuccess = createAction(
  '[Game Review page] Post Game Review Success',
  props<{
    review: GameReviewModel;
  }>()
);
export const postGameReviewFailure = createAction(
  '[Game Review page] Post Game Review Failure',
  props<{ error: string }>()
);


export const getGameReviews = createAction(
  '[Game Review Page] Get Game Review',
  props<{ id: number }>()
);
export const getGameReviewsSuccess = createAction(
  '[Game Review API] Get Game Review Success',
  props<{ reviews: GameReviewModel[] }>()
);
export const getGameReviewFailure = createAction(
  '[Game Review API] Get Game Review Failure',
  props<{ error: string }>()
);

export const deleteReview = createAction(
  '[Game Review Page] Delete Review',
  props<{ id: number }>()
);
export const deleteReviewSuccess = createAction(
  '[Game Review Page] Delete Review Success',
  props<{ id: number }>()
);
export const deleteReviewFailure = createAction(
  '[Game Review Page] Delete Review Failure',
  props<{ error: string }>()
);