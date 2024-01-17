import { NgModule, isDevMode } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  ActionReducer,
  MetaReducer,
  META_REDUCERS,
  StoreModule,
  USER_PROVIDED_META_REDUCERS,
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';

import { environment } from 'src/environments/environment';
import { AuthEffects } from './effects/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { AuthService } from '../modules/auth/auth.service';
// import { HydrationEffects } from './effects/hydration.effects';
// import { StoreAppService } from './store-app.service';
import { AppEffects } from './effects/app.effects';
// import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
// import { PersistStoreEffects } from './effects/persist-store.effects';
// import { ErrorLogEffects } from './effects/error-log.effects';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      // metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      AuthEffects,
      AppEffects,
      // PersistStoreEffects,
      // ErrorLogEffects,
    ]),
    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),

    // Connects RouterModule with StoreModule
    // EntityDataModule.forRoot({ entityMetadata }),
  ],
  providers: [],
})
export class AppStoreModule {
  constructor() {}
}
