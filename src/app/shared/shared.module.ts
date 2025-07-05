import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoaderComponent } from './loader/loader.component';
import { NoDataComponent } from './no-data/no-data.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoaderComponent,
    NoDataComponent,
    ModalComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    NoDataComponent,
    ModalComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
