import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollCreateComponent } from './pages/poll-create/poll-create.component';
import { PollViewComponent } from './pages/poll-view/poll-view.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { ListItemsComponent } from './pages/list-items/list-items.component';
import { NoDataComponent } from './shared/no-data/no-data.component';
import { VotePollComponent } from './pages/vote-poll/vote-poll.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './shared/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PollCreateComponent,
    PollViewComponent,
    AnalyticsComponent,
    LoaderComponent,
    ListItemsComponent,
    NoDataComponent,
    VotePollComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule, 
    MatButtonModule,
    NgxDaterangepickerMd.forRoot(),
    ToastrModule.forRoot({
  positionClass: 'toast-bottom-center',
  timeOut: 2000,
  newestOnTop: true,
  preventDuplicates: true,
  easeTime: 300
}),
BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
