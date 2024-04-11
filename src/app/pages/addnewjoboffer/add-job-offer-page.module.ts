import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../Shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AddJobOfferPageComponent} from "./add-job-offer-page.component";

const routes: Routes = [
  {
    path: '',
    component: AddJobOfferPageComponent
  }
]


@NgModule({
  declarations: [AddJobOfferPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AddJobOfferPageModule { }
