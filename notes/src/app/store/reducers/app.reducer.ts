import { createReducer, on } from '@ngrx/store';
import { AppActions } from '../actions/app.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorTypes } from '@workspace/app.workspace';

export const appFeatureKey = 'app';

export interface State {
  loading: boolean;
  error: HttpErrorResponse | Error | null;
  errorType?: ErrorTypes | null;
}

export const initialState: State = {
  loading: false,
  error: null,
  errorType: null,
};

export const reducer = createReducer(
  initialState,
  on(
    AppActions.setLoading,
    (state): State => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    AppActions.clearLoading,
    (state): State => ({
      ...state,
      loading: false,
    }),
  ),
  on(
    AppActions.setError,
    (state, { error, errorType = null }): State => ({
      ...state,
      error,
      errorType,
    }),
  ),
  on(
    AppActions.clearError,
    (state): State => ({
      ...state,
      error: null,
      errorType: null,
    }),
  ),
);
