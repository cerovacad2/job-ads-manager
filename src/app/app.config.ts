import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { InvoicesEffects } from './features/invoices/store/invoices.effects';
import { invoicesFeature } from './features/invoices/store/invoices.reducer';
import { JobsEffects } from './features/job-ads/store/job-ads.effects';
import { jobsFeature } from './features/job-ads/store/job-ads.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideEffects(JobsEffects, InvoicesEffects),
    provideState(jobsFeature),
    provideState(invoicesFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
  ],
};
