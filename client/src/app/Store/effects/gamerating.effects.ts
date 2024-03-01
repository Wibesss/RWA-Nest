import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as gameRatingActions from '../actions/gamerating.actions';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GameRatingService } from 'src/app/Services/gamerating.service';

@Injectable()
export class GameRatingEffects {
  constructor(
    private actions$: Actions,
    private gameRatingService: GameRatingService
  ) {}
  postGameRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameRatingActions.postGameRating),
      switchMap((action) => {
        return this.gameRatingService
          .postGameRating(action.gameRating, action.id, action.userId)
          .pipe(
            map(() =>
              gameRatingActions.postGameRatingSuccess({
                gameRating: action.gameRating,
              })
            ),
            catchError((error) =>
              of(
                gameRatingActions.postGameRatingFailure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );
}
