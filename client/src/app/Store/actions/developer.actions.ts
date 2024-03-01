import { createAction, props } from '@ngrx/store';
import { Developer, DeveloperModel } from '../types/developer.module';

export const getAllDevelopers = createAction(
  '[Developers Page] Get All Developers'
);

export const getAllDevelopersSuccess = createAction(
  '[Developers Page] Get Anime Studija Success',
  props<{ developers: DeveloperModel[] }>()
);

export const getAllDevelopersFailure = createAction(
  '[Developers Page] Get Anime Studija Failure',
  props<{ error: string }>()
);


export const postDevelopers = createAction(
  '[Developers API] Post Anime Studija',
  props<{ developer: DeveloperModel }>()
);

export const postDevelopersSuccess = createAction(
  '[Developers API] Post Anime Studija Success',
  props<{ developer: DeveloperModel }>()
);

export const postDevelopersFailure = createAction(
  '[Developers API] Post Anime Studija Failure',
  props<{ error: string }>()
);



export const getDeveloperById = createAction(
  '[getDeveloperById page] Get Developer',
  props<{ id: number }>()
);
export const getDeveloperByIdSuccess = createAction(
  '[getDeveloperById page] Get Developer Success',
  props<{ developer: Developer }>()
);
export const getDeveloperByIdFailure = createAction(
  '[getDeveloperById page] Get Developer Failure',
  props<{ error: string }>()
);
