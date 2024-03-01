import { User } from '../types/user.module';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserState } from '../types/user.interface';
import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  isLoading: false,
  error: null,
  isLoggedIn: false,
  user: null,
});

export const reducers = createReducer(
  initialState,
  on(userActions.loginUser, (state) => ({ ...state, isLoading: true })),
  on(userActions.loginUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
  })),
  on(userActions.loginUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    error: action.error,
  })),
  on(userActions.logOutUser, (state) => ({ ...state, isLoading: true })),
  on(userActions.logOutUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
  })),
  on(userActions.logOutUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(userActions.browserRolead, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
    isLoggedIn: action.isLoggedin,
  })),
  on(userActions.updateSliku, (state) => ({ ...state, isLoading: true })),
  on(userActions.updateSlikuSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    user: action.user,
  })),
  on(userActions.updateSlikuFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(userActions.getUserStudio, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userActions.getUserSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    user: action.user,
  })),
  on(userActions.getUserFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
