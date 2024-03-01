import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { UserState } from '../types/user.interface';
import { User } from '../types/user.module';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.isLoading
);

export const selectLoggedIn = createSelector(
  selectUserState,
  (state: UserState) => state.isLoggedIn
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUserFeature = createFeatureSelector<UserState>('user');
export const selectorLoading = createSelector(
  selectUserFeature,
  (state: UserState) => state.isLoading
);
export const selectorLoggedin = createSelector(
  selectUserFeature,
  (state: UserState) => state.isLoggedIn
);
export const selectorError = createSelector(
  selectUserFeature,
  (state: UserState) => state.error
);
export const userSelector = createSelector(
  selectUserFeature,
  (state: UserState) => state.user
);
