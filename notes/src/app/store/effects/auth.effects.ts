import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../actions/auth.actions';
import { AppActions } from '../actions/app.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { JwtToken, SigninDto, SignupDto } from '@workspace/app.workspace';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from 'src/app/modules/auth/auth.interface';

@Injectable()
export class AuthEffects {
  setLoading = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signin, AuthActions.signup, AuthActions.logout),
      map((_) => AppActions.setLoading()),
    ),
  );

  signin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signin),
      map((action) => action.user),
      switchMap((user: SigninDto) =>
        this.authService.signin(user).pipe(
          map((token) => AuthActions.storeToken({ token })),
          catchError((error: HttpErrorResponse) => [
            AppActions.setError({ error, errorType: 'authenticationError' }),
          ]),
        ),
      ),
    );
  });

  signup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signup),
      map((action) => action.user),
      switchMap((user: SignupDto) =>
        this.authService.signup(user).pipe(
          map((token) => AuthActions.storeToken({ token })),
          catchError((error: HttpErrorResponse) => [
            AppActions.setError({ error, errorType: 'authenticationError' }),
          ]),
        ),
      ),
    );
  });

  logout = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map((token) => AuthActions.storeToken({ token })),
          catchError((error: HttpErrorResponse) => [
            AppActions.setError({ error, errorType: 'authenticationError' }),
          ]),
        ),
      ),
    );
  });

  storeToken = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.storeToken),
      map((action) => action.token),
      map((token: JwtToken) => this.authService.setToStorage('token', token)),
      map((_) => AuthActions.decodeToken()),
    );
  });

  decodeToken = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.decodeToken),
      switchMap(() =>
        this.authService.getTokenAndDecode().pipe(
          map((user: IUser) => AuthActions.decodeTokenSuccess({ user })),
          catchError((error: Error) => [AuthActions.decodeTokenFail({ error })]),
          // catchError((error) => of(AuthActions.logout())),
        ),
      ),
    );
  });

  setError = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.decodeTokenFail, AuthActions.fetchFromServerTokenFail),
      map((action) => action.error),
      map((error: HttpErrorResponse | Error) =>
        AppActions.setError({ error, errorType: 'authenticationError' }),
      ),
    );
  });

  removeTokenFromStorage = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.decodeTokenFail, AuthActions.fetchFromServerTokenFail),
        switchMap(() => this.authService.removeFromStorage('token')),
      );
    },
    { dispatch: false },
  );

  private authService = inject(AuthService);
  constructor(private actions$: Actions) {}
}
