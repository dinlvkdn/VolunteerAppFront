import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SigninPageComponent} from "./signin-page.component";
import {SharedModule} from "../../Shared/shared.module";
const routes: Routes = [
  {
    path: '',
    component: SigninPageComponent
  }
]
@NgModule({
  declarations: [SigninPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SigninPageModule { }
