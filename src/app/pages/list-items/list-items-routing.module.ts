import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListItemsComponent } from './list-items.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  { path: '', component: ListItemsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListItemsRoutingModule { }
