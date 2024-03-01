import { createAction, props } from '@ngrx/store';
import { Game, GameModel } from '../types/game.module';

export const getGameById = createAction(
  '[getGameById page] getGames',
  props<{ id: number }>()
);
export const getGameByIdSuccess = createAction(
  '[getGameById page] Get Games By Id Success',
  props<{ game: Game }>()
);
export const getGameByIdFailure = createAction(
  '[getGameById page] Get Game Failure',
  props<{ error: string }>()
);



export const getAllGames = createAction('[Game Page] Get Games');
export const getAllGamesSuccess = createAction(
  '[Game Page] Get Game Success',
  props<{ games: Game[] }>()
);
export const getAllGamesFailure = createAction(
  '[Game Page] Get Game Failure',
  props<{ error: string }>()
);

export const getGamesForDeveloper = createAction(
  '[GamesForDeveloper page] getGames',
  props<{ id: number }>()
);
export const getGamesForDeveloperSuccess = createAction(
  '[GamesForDeveloper page] Get Games For Developer Success',
  props<{ games: Game[] }>()
);
export const getGamesForDeveloperFailure = createAction(
  '[GamesForDeveloper page] Get Game Failure',
  props<{ error: string }>()
);

export const getGamesForUser = createAction(
  '[Get Games For User page] getGames',
  props<{ id: number }>()
);
export const getGamesForUserSuccess = createAction(
  '[Get Games For User] Get Games For Developer Success',
  props<{ games: Game[] }>()
);
export const getGamesForUserFailure = createAction(
  '[Get Games For User] Get Games Failure',
  props<{ error: string }>()
);

export const postGame = createAction(
  '[Game Rating page] Post Game',
  props<{ game: Game; id: number }>()
);
export const postGameSuccess = createAction(
  '[Game Rating page] Post Game Success',
  props<{ game: Game }>()
);
export const postGameFailure = createAction(
  '[Game  page] Post Game Failure',
  props<{ error: string }>()
);

export const updateGame = createAction(
  '[Update Page] Update Game',
  props<{ game: Game }>()
);
export const updateGameSuccess = createAction(
  '[Update Page], Update Game Success',
  props<{ game: Game }>()
);
export const updateGameFailure = createAction(
  '[Update Page], Update Game Failure',
  props<{ error: string }>()
);

export const addGameToUser = createAction(
  '[Add Game to Useru] Add Game To User',
  props<{ userId: number; gameId: number }>()
);

export const addGameToUserSuccess = createAction(
  '[Add Game to Useru] Add Game To User Success',
  props<{ game: GameModel }>()
);

export const addGameToUserFailure = createAction(
  '[Add Game to Useru] Add Game To User Failure',
  props<{ error: string }>()
);
