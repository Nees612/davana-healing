import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(),
   ]
};
