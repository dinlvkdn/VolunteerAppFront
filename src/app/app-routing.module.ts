import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VolunteerGuard} from "./core/services/guards/volunteer-guard.service";
import {OrganizationGuard} from "./core/services/guards/organization-guard.service";

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
      .then(m => m.AddInfoPageModule),
      canActivate: [[VolunteerGuard], [OrganizationGuard]]
  },
  {
    path : 'job-offers',
    loadChildren: () => import('./pages/job-offers-page/job-offers-page.module')
      .then(m => m.JobOffersPageModule),
      canActivate: [VolunteerGuard]
  },
  {
    path : 'volunteers',
    loadChildren: () => import('./pages/volunteers-page/volunteers-page.module')
      .then(m => m.VolunteersPageModule),
      canActivate: [OrganizationGuard]
  },
  {
    path : 'job-offer/:id',
    loadChildren: () => import('./pages/job-offer-page/job-offer-page.module')
      .then(m => m.JobOfferPageModule),
      canActivate: [[VolunteerGuard], [OrganizationGuard]]

  },
  {
    path : 'add-job-offer',
    loadChildren: () => import('./pages/addnewjoboffer/add-job-offer-page.module')
      .then(m => m.AddJobOfferPageModule),
    canActivate: [OrganizationGuard]
  },
  {
    path : 'organization/:id',
    loadChildren: () => import('./pages/organization-page/organization-page.module')
      .then(m => m.OrganizationPageModule),
    canActivate: [VolunteerGuard]
  },
  {
    path : 'my',
    loadChildren: () => import('./pages/personal-page/personal-page.module')
      .then(m => m.PersonalPageModule),
    canActivate: [[VolunteerGuard], [OrganizationGuard]]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
