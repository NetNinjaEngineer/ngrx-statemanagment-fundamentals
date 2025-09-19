import { Inject, InjectionToken, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { provideHttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './auth/store/auth.reducer';
import { authFeatureKey } from './auth/store/auth.selectors';
import { SharedLoadingSpinnerComponent } from './shared/components/shared-loading-spinner/shared-loading-spinner.component';
import { sharedFeatureKey } from './shared/store/shared.selectors';
import { sharedReducer } from './shared/store/shared.reducer';

// export const LOGGER_SERVICE_TOKEN = new InjectionToken<LoggerService>('LoggerToken');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SharedLoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ [authFeatureKey]: authReducer, [sharedFeatureKey]: sharedReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([])
  ],
  providers: [provideHttpClient()], // application level
  bootstrap: [AppComponent]
})
export class AppModule { }
