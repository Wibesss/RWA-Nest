
import { loginUser } from './../actions/user.actions';
import { createAction } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.actions';
import { catchError, defer, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../types/user.module';
import { LoginService } from 'src/app/Services/login.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap((user) => {
        return this.loginService
          .login(user.user.username, user.user.password)
          .pipe(
            map(() => UserActions.loginUserSuccess({ message: 'Success' })),
            catchError((error) =>
              of(UserActions.loginUserFailure({ error: error.message }))
            )
          );
      })
    )
  );

  logInUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginUserSuccess),
        tap(() => {
          this.authService.getLoggedUser().subscribe((user: User) => {
            localStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logInUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginUserFailure),
        tap(() => {
          alert('Wrong Username or Password');
        })
      ),
    { dispatch: false }
  );

  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logOutUser),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() =>
            UserActions.logOutUserSuccess({ message: 'Logout succesful' })
          ),
          catchError((error) => of(UserActions.logOutUserFailure({ error })))
        )
      )
    )
  );

  logOutUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logOutUserSuccess),
        tap(() => {
          localStorage.removeItem('loggedUser');
          localStorage.removeItem('isLoggedIn');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
  
  updateSliku$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateSliku),
      mergeMap((action) => {
        return this.userService.putAnime(action.userId, action.photo).pipe(
          map((user : User) => UserActions.updateSlikuSuccess({ user })),
          catchError((error) =>
            of(UserActions.updateSlikuFailure({ error: error.message }))
          )
        );
      })
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserStudio),
      mergeMap((action) => {
        return this.userService.getUser(action.id).pipe(
          map((user : User) => UserActions.getUserSuccess({ user })),
          catchError((error) =>
            of(UserActions.getUserFailure({ error: error.message }))
          )
        );
      })
    )
  );

  
}