import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { JwtToken } from '@workspace/app.workspace';
import { IUser } from 'src/app/modules/auth/auth.interface';

export const authFeatureKey = 'auth';

export interface State {
  // token: JwtToken | null;
  user: IUser | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.decodeTokenSuccess,
    (state, { user }): State => ({
      ...state,
      user,
    }),
  ),
  on(
    AuthActions.decodeTokenFail,
    (state, { error }): State => ({
      ...state,
      user: null,
    }),
  ),
);
