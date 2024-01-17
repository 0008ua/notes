import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { JwtToken, SigninDto, SignupDto } from '@workspace/app.workspace';
import { IUser } from 'src/app/modules/auth/auth.interface';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    logout: emptyProps(),
    signin: props<{ user: SigninDto }>(),
    signup: props<{ user: SignupDto }>(),
    storeToken: props<{ token: JwtToken }>(),
    decodeToken: emptyProps(),
    decodeTokenSuccess: props<{ user: IUser }>(),
    decodeTokenFail: props<{ error: Error }>(),
    fetchFromServerTokenFail: props<{ error: Error }>(),
  },
});
