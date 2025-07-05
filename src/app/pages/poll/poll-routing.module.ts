import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollCreateComponent } from '../poll-create/poll-create.component';
import { PollViewComponent } from '../poll-view/poll-view.component';
import { VotePollComponent } from '../vote-poll/vote-poll.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  { path: 'create', component: PollCreateComponent, canActivate: [AuthGuard] },
  { path: ':slug', component: PollViewComponent },
  { path: 'vote/:id', component: VotePollComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule { }
