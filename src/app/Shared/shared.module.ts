import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox'
import {AddInfoSectionComponent} from "./add-info-section/add-info-section.component";
import {AuthButtonComponent} from "./auth-button/auth-button.component";
import {AuthSectionComponent} from "./auth-section/auth-section.component";
import {FiltersJobOffersComponent} from "./filters-job-offers/filters-job-offers.component";
import {JobOfferCardComponent} from "./job-offer-card/job-offer-card.component";
import {ProjectIconComponent} from "./project-icon/project-icon.component";
import {ButtonComponent} from "./button/button.component";
import {WelcomeSectionComponent} from "./welcome-section/welcome-section.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { AddJobOfferComponent } from './add-job-offer/add-job-offer.component';
import {MatButton} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AddInfoSectionComponent,
    AuthButtonComponent,
    AuthSectionComponent,
    FiltersJobOffersComponent,
    JobOfferCardComponent,
    ProjectIconComponent,
    ButtonComponent,
    WelcomeSectionComponent,
    FooterComponent,
    AddJobOfferComponent,],
    imports: [
        CommonModule,
        MatCheckbox,
        ReactiveFormsModule,
        RouterLink,
        MatButton,
        MatInputModule,
        MatProgressSpinnerModule
    ],
  exports: [
    MatCheckboxModule,
    AddInfoSectionComponent,
    AuthButtonComponent,
    AuthSectionComponent,
    FiltersJobOffersComponent,
    JobOfferCardComponent,
    ProjectIconComponent,
    ButtonComponent,
    WelcomeSectionComponent,
    FooterComponent,
    AddJobOfferComponent,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {
}
