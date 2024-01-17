import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { GetResult, Preferences } from '@capacitor/preferences';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { JwtToken, SigninDto, SignupDto } from '@workspace/app.workspace';
import { environment } from 'src/environments/environment';
import { IUser } from './auth.interface';
import { JWT_DECODE } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private jwtDecode = inject(JWT_DECODE);

  host = environment.host;
  // url$: Observable<string>;

  constructor() {
    // private router: Router, // private store: Store, // private http: HttpClient,
    // this.url$ = this.store.select(selectRedirectionUrl);
    // this.url$.subscribe((url) => {
    //   if (url) {
    //     this.router.navigateByUrl(url);
    //     this.store.dispatch(redirection({ redirectionUrl: null }));
    //   }
    // });
  }

  echoProtected(echo: { data: string }): Observable<{ data: string }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<{ data: string }>(
      this.host + '/api/auth/protected',
      echo,
      httpOptions,
    );
  }

  signin(user: SigninDto): Observable<JwtToken> {
    // return this.http.post('/api/auth/signin', { body: user });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<JwtToken>(this.host + '/api/auth/signin', user, httpOptions);
  }

  signup(user: SignupDto): Observable<JwtToken> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<JwtToken>(this.host + 'api/auth/signup', user, httpOptions);
  }

  logout(): Observable<JwtToken> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<JwtToken>(
      this.host + 'api/auth/signup',
      { user: null },
      httpOptions,
    );
  }

  setToStorage(key: string, value: any): Observable<void> {
    return from(Preferences.set({ key, value }));
  }

  getFromStorage(key: string): Observable<string | null> {
    return from(Preferences.get({ key })).pipe(
      map((getResult: GetResult) => getResult.value),
    );
  }

  getTokenAndDecode(): Observable<IUser> {
    return this.getFromStorage('token').pipe(
      map((token) => {
        if (!token) {
          throw new Error('No Token');
        }
        return this.jwtDecode<IUser>(token);
      }),
    );
  }

  removeFromStorage(key: string): Observable<void> {
    return from(Preferences.remove({ key }));
  }

  // sync validator
  matchPassword(abstractControl: AbstractControl): null {
    const password = abstractControl.get('password')?.value;
    const passwordConfirm = abstractControl.get('passwordConfirm')?.value;
    if (password === passwordConfirm) {
      abstractControl.get('passwordConfirm')?.setErrors(null);
      return null;
    } else {
      /**
       * set error to 'passwordConfirm' element
       */

      abstractControl.get('passwordConfirm')?.setErrors({ mismatch: true });
      /**
       * and don't set error (null) to formGroup
       */
      return null;
    }
  }
}
