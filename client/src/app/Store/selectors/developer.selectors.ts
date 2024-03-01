import { adapter } from '../reducers/developer.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeveloperState } from '../types/developer.interface';
import { DeveloperStatee } from '../types/developerr.interface';

export const selectDeveloperFeature =
  createFeatureSelector<DeveloperStatee>('Developers');
export const isLoadingSelector = createSelector(
  selectDeveloperFeature,
  (state: DeveloperStatee) => state.isLoading
);
export const developerSelector = createSelector(
  selectDeveloperFeature,
  (state: DeveloperStatee) => state.developer
);
export const errorSelector = createSelector(
  selectDeveloperFeature,
  (state: DeveloperStatee) => state.error
);

export const selectDevelopersFeature =
  createFeatureSelector<DeveloperState>('Developers');
export const selectorLoading = createSelector(
  selectDevelopersFeature,
  (state: DeveloperState) => state.isLoading
);

export const selectorDevelopers = createSelector(
  selectDevelopersFeature,
  adapter.getSelectors().selectAll
);
export const selectorError = createSelector(
  selectDevelopersFeature,
  (state: DeveloperState) => state.error
);


