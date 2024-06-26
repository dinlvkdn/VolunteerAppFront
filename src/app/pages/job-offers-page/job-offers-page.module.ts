import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JobOffersPageComponent} from "./job-offers-page.component";
import {SharedModule} from "../../Shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: JobOffersPageComponent
  }
]

@NgModule({
  declarations: [JobOffersPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatPaginator,
    FormsModule
  ]
})
export class JobOffersPageModule { }
