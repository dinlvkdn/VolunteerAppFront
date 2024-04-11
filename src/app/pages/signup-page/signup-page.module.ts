import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SignupPageComponent} from "./signup-page.component";
import {SharedModule} from "../../Shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: SignupPageComponent
  }
]

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SignupPageModule { }
