import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as gameActions from '../actions/game.actions';
import { GameModel } from '../types/game.module';
import { GameState } from '../types/game.interface';
import { act } from '@ngrx/effects';

export const adapter: EntityAdapter<GameModel> =
  createEntityAdapter<GameModel>();

export const initialState: GameState = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});
export const gameReducer = createReducer(
  initialState,
  
  on(gameActions.getGameById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(gameActions.getGameByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    game: action.game,
  })),
  on(gameActions.getGameByIdFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  
  on(gameActions.getAllGames, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(gameActions.getAllGamesSuccess, (state, action) => {
    return adapter.setAll(action.games, { ...state, isLoading: false });
  }),
  on(gameActions.getAllGamesFailure, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(gameActions.getGamesForDeveloper, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(gameActions.getGamesForDeveloperSuccess, (state, action) => {
    return adapter.setAll(action.games, { ...state, isLoading: false });
  }),
  on(gameActions.getGamesForDeveloperFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(gameActions.getGamesForUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(gameActions.getGamesForUserSuccess, (state, action) => {
    return adapter.setAll(action.games, { ...state, isLoading: false });
  }),
  on(gameActions.getGamesForUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(gameActions.postGame, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(gameActions.postGameSuccess, (state, action) => {
    return adapter.addOne(action.game, { ...state, isLoading: false });
  })
);
