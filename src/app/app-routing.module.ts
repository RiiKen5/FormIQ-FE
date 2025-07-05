import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollCreateComponent } from './pages/poll-create/poll-create.component';
import { PollViewComponent } from './pages/poll-view/poll-view.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ListItemsComponent } from './pages/list-items/list-items.component';
import { VotePollComponent } from './pages/vote-poll/vote-poll.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'poll/create', component: PollCreateComponent,canActivate: [AuthGuard] },
  { path: 'poll/:slug', component: PollViewComponent },
  { path: 'list-items', component: ListItemsComponent,canActivate: [AuthGuard] },
  {
  path: 'poll/vote/:id',
  component: VotePollComponent
},
  { path: 'analytics/:pollId/:questionId', component: AnalyticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
