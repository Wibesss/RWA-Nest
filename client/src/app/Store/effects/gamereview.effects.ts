import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as gameReviewActions from '../actions/gamereview.actions';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GameReviewService } from 'src/app/Services/gamereview.service';

@Injectable()
export class GameReviewEffects {
  constructor(
    private actions$: Actions,
    private gameReviewService: GameReviewService
  ) {}

  postGameReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameReviewActions.postGameReview),
      switchMap((action) => {
        return this.gameReviewService
          .postGameReview(action.review, action.id, action.userId)
          .pipe(
            map(() =>
              gameReviewActions.postGameReviewSuccess({
                review: action.review,
              })
            ),
            catchError((error) =>
              of(
                gameReviewActions.postGameReviewFailure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );

  getGameReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameReviewActions.getGameReviews),
      mergeMap((action) => {
        return this.gameReviewService.getAllReviewsForGameById(action.id).pipe(
          map((reviews) =>
            gameReviewActions.getGameReviewsSuccess({ reviews })
          ),
          catchError((error) =>
            of(
              gameReviewActions.getGameReviewFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  removeReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameReviewActions.deleteReview),
      mergeMap((action) => {
        return this.gameReviewService.deleteReviewById(action.id).pipe(
          map((id) => gameReviewActions.deleteReviewSuccess({ id: action.id })),
          catchError((error) =>
            of(
              gameReviewActions.deleteReviewFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
}
