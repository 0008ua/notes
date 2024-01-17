import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ErrorTypes } from '@workspace/app.workspace';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Load Apps': emptyProps(),
    'Set loading': emptyProps(),
    'Clear Loading': emptyProps(),
    'Set error': props<{ error: HttpErrorResponse | Error; errorType: ErrorTypes }>(),
    'Clear error': emptyProps(),
  },
});
