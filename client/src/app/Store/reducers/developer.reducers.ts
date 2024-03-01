import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as developerActions from '../actions/developer.actions';
import { DeveloperModel } from '../types/developer.module';
import { DeveloperState } from '../types/developer.interface';


export const adapter: EntityAdapter<DeveloperModel> =
  createEntityAdapter<DeveloperModel>();

export const initialState: DeveloperState = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const developerReducer = createReducer(
  initialState,
  on(developerActions.getAllDevelopers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(developerActions.getAllDevelopersSuccess, (state, action) => {
    return adapter.addMany(action.developers, { ...state, isLoading: false });
  }),
  on(developerActions.getAllDevelopersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(developerActions.postDevelopers, (state, action) => {
    return adapter.addOne(action.developer, { ...state, isLoading: false });
  }),

  on(developerActions.postDevelopersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(developerActions.getDeveloperById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(developerActions.getDeveloperByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    developer: action.developer,
  })),
  on(developerActions.getDeveloperByIdFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(developerActions.getAllDevelopersFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

