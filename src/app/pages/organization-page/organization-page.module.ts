import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../Shared/shared.module";
import {OrganizationPageComponent} from "./organization-page.component";

const routes: Routes = [
  {
    path: '',
    component: OrganizationPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class OrganizationPageModule { }
