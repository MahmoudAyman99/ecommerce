import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
providers: [provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loaderInterceptor,errorInterceptor])),
  provideRouter(routes,withViewTransitions() ,
    withInMemoryScrolling({scrollPositionRestoration: 'enabled'})),
    
     provideClientHydration(),
     importProvidersFrom(RouterModule , BrowserAnimationsModule ,NgxSpinnerService),provideToastr()]
};
