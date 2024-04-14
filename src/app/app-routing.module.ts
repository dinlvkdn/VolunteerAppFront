import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JobOffersPageModule} from "./pages/job-offers-page/job-offers-page.module";

const routes: Routes = [
  {
    path : '',
    redirectTo : 'signin',
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
    path : 'job-offers',
    loadChildren: () => import('./pages/job-offers-page/job-offers-page.module')
      .then(m => m.JobOffersPageModule)
  },
  {
    path : 'volunteers',
    loadChildren: () => import('./pages/volunteers-page/volunteers-page.module')
      .then(m => m.VolunteersPageModule)
  },
  {
    path : 'job-offer/:id',
    loadChildren: () => import('./pages/job-offer-page/job-offer-page.module')
      .then(m => m.JobOfferPageModule)
  },
  {
    path : 'add-job-offer',
    loadChildren: () => import('./pages/addnewjoboffer/add-job-offer-page.module')
      .then(m => m.AddJobOfferPageModule)
  },
  {
    path : 'organization/:id',
    loadChildren: () => import('./pages/organization-page/organization-page.module')
      .then(m => m.OrganizationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
