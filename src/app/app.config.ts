import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  // Every component is OnPush + signals, so change detection runs without zone.js
  // (one less polyfill to download and boot). Below-the-fold sections hydrate on viewport.
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withIncrementalHydration()),
  ]
};
