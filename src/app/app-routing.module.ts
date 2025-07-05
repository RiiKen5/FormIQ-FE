import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
  path: 'auth',
  loadChildren: () =>
    import('./pages/auth/auth.module').then(m => m.AuthModule)
}
,
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'poll',
    loadChildren: () => import('./pages/poll/poll.module').then(m => m.PollModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./pages/analytics/analytics.module').then(m => m.AnalyticsModule)
  },
  {
    path: 'list-items',
    loadChildren: () => import('./pages/list-items/list-items.module').then(m => m.ListItemsModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
