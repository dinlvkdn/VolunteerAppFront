import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JobOffersPageModule} from "./pages/job-offers-page/job-offers-page.module";

const routes: Routes = [
  {
    path : '',
    redirectTo : 'signup',
    pathMatch : "full"
  },
  {
    path : 'signup',
    loadChildren: () => import('./pages/signup-page/signup-page.module')
      .then(m => m.SignupPageModule)
  },
  {
    path : 'signin',
    loadChildren: () => import('./pages/signin-page/signin-page.module')
      .then(m => m.SigninPageModule)
  },
  {
    path : 'add-info',
    loadChildren: () => import('./pages/add-info-page/add-info-page.module')
      .then(m => m.AddInfoPageModule)
  },
  {
    path : 'joboffers',
    loadChildren: () => import('./pages/job-offers-page/job-offers-page.module')
      .then(m => m.JobOffersPageModule)
  },
  {
    path : 'job-offer',
    loadChildren: () => import('./pages/job-offer-page/job-offer-page.module')
      .then(m => m.JobOfferPageModule)
  },
  {
    path : 'add-job-offer',
    loadChildren: () => import('./pages/addnewjoboffer/add-job-offer-page.module')
      .then(m => m.AddJobOfferPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
