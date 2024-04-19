import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {JobOffersPageComponent} from "../job-offers-page/job-offers-page.component";
import {SharedModule} from "../../Shared/shared.module";
import {MatPaginator} from "@angular/material/paginator";
import {NotFoundComponent} from "./not-found.component";

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
]



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatPaginator
  ]
})
export class NotFoundModule { }
