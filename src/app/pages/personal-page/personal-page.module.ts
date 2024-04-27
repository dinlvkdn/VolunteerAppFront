import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PersonalPageComponent} from "./personal-page.component";
import {SharedModule} from "../../Shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: PersonalPageComponent
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

export class PersonalPageModule { }
