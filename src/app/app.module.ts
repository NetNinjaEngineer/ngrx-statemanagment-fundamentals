import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './auth/store/auth.reducer';
import { authFeatureKey } from './auth/store/auth.selectors';
import { AuthEffects } from './auth/store/auth.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { Coursesv2Module } from './coursesv2/coursesv2.module';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

// export const LOGGER_SERVICE_TOKEN = new InjectionToken<LoggerService>('LoggerToken');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ [authFeatureKey]: authReducer, router: routerReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    Coursesv2Module,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, loggingInterceptor])
    ),
    provideRouterStore()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
