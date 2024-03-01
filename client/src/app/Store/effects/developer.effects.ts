import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as developerActions from '../actions/developer.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DeveloperService } from 'src/app/Services/developer.service';

@Injectable()
export class DeveloperEffects {
  constructor(
    private actions$: Actions,
    private developerService: DeveloperService
  ) {}

  getAllDevelopers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(developerActions.getAllDevelopers),
      mergeMap(() => {
        return this.developerService.getAllDevelopers().pipe(
          map((developers) =>
            developerActions.getAllDevelopersSuccess({ developers })
          ),
          catchError((error) =>
            of(
              developerActions.getAllDevelopersFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  addDeveloper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(developerActions.postDevelopers),
      mergeMap((action) =>
        this.developerService.addDeveloper(action.developer).pipe(
          map((developer) =>
            developerActions.postDevelopersSuccess({ developer })
          ),
          catchError((error) =>
            of(
              developerActions.postDevelopersFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  getDeveloper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(developerActions.getDeveloperById),
      mergeMap((action) => {
        return this.developerService.getDeveloperById(action.id).pipe(
          map((developer) =>
            developerActions.getDeveloperByIdSuccess({ developer })
          ),
          catchError((error) =>
            of(
              developerActions.getDeveloperByIdFailure({ error: error.message })
            )
          )
        );
      })
    )
  );
}
