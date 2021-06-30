import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './services/http-auth.interceptor';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AppComponent } from './views/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpLoaderInterceptor } from './services/http-loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    LoaderComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true
  }],
  exports: [
    // necesitamos exportar el módulo para que le pueda llegar al AppModule
    AppComponent
  ]
})
export class CoreModule { }
