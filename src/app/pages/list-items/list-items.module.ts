import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListItemsRoutingModule } from './list-items-routing.module';
import { ListItemsComponent } from './list-items.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListItemsComponent],
  imports: [
    CommonModule,
    ListItemsRoutingModule,
    SharedModule,
    FormsModule
]
})
export class ListItemsModule { }
