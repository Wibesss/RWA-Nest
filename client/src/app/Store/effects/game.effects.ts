import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as gameActions from '../actions/game.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { GameService } from 'src/app/Services/game.service';

@Injectable()
export class GamesEffects {
  constructor(private actions$: Actions, private gameService: GameService) {}

  getGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.getGameById),
      mergeMap((action) => {
        return this.gameService.getGameById(action.id).pipe(
          map((game) => gameActions.getGameByIdSuccess({ game })),
          catchError((error) =>
            of(gameActions.getGameByIdFailure({ error: error.message }))
          )
        );
      })
    )
  );

  getAllGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.getAllGames),
      tap(() => console.log('getAllGames action triggered')),
      mergeMap(() => {
        return this.gameService.getAllGames().pipe(
          map((games) => gameActions.getAllGamesSuccess({ games })),
          catchError((error) =>
            of(
              gameActions.getAllGamesFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  getGamesForDeveloper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.getGamesForDeveloper),
      mergeMap((action) => {
        return this.gameService.getGamesForDeveloper(action.id).pipe(
          map((games) => gameActions.getGamesForDeveloperSuccess({ games })),
          catchError((error) =>
            of(
              gameActions.getGamesForDeveloperFailure({ error: error.message })
            )
          )
        );
      })
    )
  );

  getGamesForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.getGamesForUser),
      mergeMap((action) => {
        return this.gameService.getGamesForUser(action.id).pipe(
          map((games) => gameActions.getGamesForUserSuccess({ games })),
          catchError((error) =>
            of(gameActions.getGamesForUserFailure({ error: error.message }))
          )
        );
      })
    )
  );

  addGameToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.addGameToUser),
      mergeMap((action) => {
        return this.gameService
          .addGameToUser(action.userId, action.gameId)
          .pipe(
            map((game) => gameActions.addGameToUserSuccess({ game })),
            catchError((error) =>
              of(gameActions.addGameToUserFailure({ error: error.message }))
            )
          );
      })
    )
  );

  postGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.postGame),
      mergeMap((action) => {
        return this.gameService.postGame(action.game, action.id).pipe(
          map(() =>
            gameActions.postGameSuccess({
              game: action.game,
            })
          ),
          catchError((error) =>
            of(
              gameActions.postGameFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
}
