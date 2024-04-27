import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SignupPageComponent} from "../signup-page/signup-page.component";
import {VolunteersPageComponent} from "./volunteers-page.component";
import {SharedModule} from "../../Shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: VolunteersPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class VolunteersPageModule { }
