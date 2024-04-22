import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PersonalPageComponent} from "../personal-page/personal-page.component";
import {AdminPageComponent} from "./admin-page.component";
import {SharedModule} from "../../Shared/shared.module";
import {MatPaginator} from "@angular/material/paginator";

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent
  }
]

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatPaginator
  ]
})
export class AdminPageModule { }
