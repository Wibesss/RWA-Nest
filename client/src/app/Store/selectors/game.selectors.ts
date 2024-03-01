import { adapter } from '../reducers/game.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from '../types/game.interface';
import { GameStatee } from '../types/gamee.interface';

export const selectGameFeature = createFeatureSelector<GameStatee>('Games');
export const isLoadingSelector = createSelector(
  selectGameFeature,
  (state: GameStatee) => state.isLoading
);
export const gameSelector = createSelector(
  selectGameFeature,
  (state: GameStatee) => state.game
);
export const errorSelector = createSelector(
  selectGameFeature,
  (state: GameStatee) => state.error
);


export const selectGamesFeature = createFeatureSelector<GameState>('Games');

// Use this selector for the HeaderComponent
export const homeSelectorLoading = createSelector(
  selectGamesFeature,
  (state: GameState) => state.isLoading
);
export const homeSelectorGames = createSelector(
  selectGamesFeature,
  adapter.getSelectors().selectAll
);
export const homeSelectorError = createSelector(
  selectGamesFeature,
  (state: GameState) => state.error
);

// Use this selector for the AnimestudioComponent
export const developerSelectorLoading = createSelector(
  selectGamesFeature,
  (state: GameState) => state.isLoading
);
export const developerSelectorGames = createSelector(
  selectGamesFeature,
  adapter.getSelectors().selectAll
);
export const developerSelectorError = createSelector(
  selectGamesFeature,
  (state: GameState) => state.error
);
export const gameuserSelectorLoading = createSelector(
  selectGamesFeature,
  (state: GameState) => state.isLoading
);
export const gameuserSelectorGames = createSelector(
  selectGamesFeature,
  adapter.getSelectors().selectAll
);
export const gameuserSelectorError = createSelector(
  selectGamesFeature,
  (state: GameState) => state.error
);
