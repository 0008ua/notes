import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AuthService } from '../modules/auth/auth.service';
import { AuthActions } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  private authService = inject(AuthService);
  private store = inject(Store);
  private http = inject(HttpClient);

  host = environment.host;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getFromStorage('token').pipe(
      // TODO choose between switheMap and mergeMap
      switchMap((token) => {
        if (token) {
          req = req.clone({
            headers: req.headers.set('Authorization', token),
          });
        }
        return next.handle(req);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // get protected resource fail
          // bad token or new guest user without token
          // try to get valid guest token
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          };
          return this.http
            .post<string>(this.host + '/api/auth/signup', null, httpOptions)
            .pipe(
              tap(() => console.log('http')),
              catchError((getTokenError: HttpErrorResponse) => {
                // error get valid guest token
                // pass error to store
                this.store.dispatch(AuthActions.fetchFromServerTokenFail(getTokenError));
                // forward error
                return throwError(() => getTokenError);
              }),
              switchMap((token: string) => {
                // successeful get valid guest token
                // save new token to store
                this.store.dispatch(AuthActions.storeToken({ token }));
                req = req.clone({
                  headers: req.headers.set('Authorization', token),
                });
                // second try to get protected resource
                return next.handle(req);
              }),
            );
        }
        return throwError(() => error);
      }),
    );
  }
}
