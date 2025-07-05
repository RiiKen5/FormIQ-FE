import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { PollModule } from './pages/poll/poll.module';
import { AnalyticsModule } from './pages/analytics/analytics.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './pages/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule,
    NgxDaterangepickerMd.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      timeOut: 2000,
      newestOnTop: true,
      preventDuplicates: true,
      easeTime: 300
    }),
    BrowserAnimationsModule,
    DashboardModule,
    PollModule,
    AnalyticsModule,
    AuthModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
