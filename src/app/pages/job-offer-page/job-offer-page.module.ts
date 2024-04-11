import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AddInfoPageComponent} from "../add-info-page/add-info-page.component";
import {JobOfferPageComponent} from "./job-offer-page.component";
import {SharedModule} from "../../Shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: JobOfferPageComponent
  }
]

@NgModule({
  declarations: [JobOfferPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class JobOfferPageModule { }
