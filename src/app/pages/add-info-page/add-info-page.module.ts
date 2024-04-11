import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AddInfoPageComponent} from "./add-info-page.component";
import {SharedModule} from "../../Shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: AddInfoPageComponent
  }
]

@NgModule({
  declarations: [AddInfoPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AddInfoPageModule { }
