import { cartReducer } from './states/cart/cart.reducer';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore(), // Initialize NgRx Store
    provideState({ name: 'counter', reducer: cartReducer }) // Provide the state with reducer
  ]
};
