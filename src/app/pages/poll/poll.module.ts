import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollRoutingModule } from './poll-routing.module';
import { PollCreateComponent } from '../poll-create/poll-create.component';
import { PollViewComponent } from '../poll-view/poll-view.component';
import { VotePollComponent } from '../vote-poll/vote-poll.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PollCreateComponent,PollViewComponent,VotePollComponent],
  imports: [
    CommonModule,
    PollRoutingModule,
    FormsModule
  ]
})
export class PollModule { }
