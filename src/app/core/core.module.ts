import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './services/http-auth.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AppComponent } from './views/app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpLoaderInterceptor } from './services/http-loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import localeEs from '@angular/common/locales/es';
import { HotToastModule } from '@ngneat/hot-toast';

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HotToastModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'
    }
  ],
  exports: [
    // necesitamos exportar el módulo para que le pueda llegar al AppModule
    AppComponent
  ]
})
export class CoreModule { }
