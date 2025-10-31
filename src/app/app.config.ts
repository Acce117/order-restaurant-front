import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authJwtInterceptor } from './auth/interceptors/auth-jwt.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { validJwtInterceptor } from './auth/interceptors/valid-jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([validJwtInterceptor, authJwtInterceptor, errorInterceptor]),
    ),
  ]
};
