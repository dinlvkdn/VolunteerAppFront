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
import {FooterComponent } from './footer/footer.component';
import {AddJobOfferComponent } from './add-job-offer/add-job-offer.component';
import {MatButton} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VolunteerCardComponent } from './volunteer-card/volunteer-card.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {UpdateInfoSectionComponent} from './update-info-section/update-info-section.component';
import {StarRatingComponent} from './star-rating/star-rating.component';
import {MatIconModule} from "@angular/material/icon";
import { FeedbackComponent } from './feedback/feedback.component';

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
    AddJobOfferComponent,
    VolunteerCardComponent,
    ConfirmationDialogComponent,
    UpdateInfoSectionComponent,
    StarRatingComponent,
    FeedbackComponent,
    ],
    imports: [
        CommonModule,
        MatCheckbox,
        ReactiveFormsModule,
        RouterLink,
        MatButton,
        MatInputModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule
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
    MatProgressSpinnerModule,
    VolunteerCardComponent,
    MatExpansionModule,
    MatFormFieldModule,
    MatDialogModule,
    ConfirmationDialogComponent,
    UpdateInfoSectionComponent,
    StarRatingComponent,
    ReactiveFormsModule,
    FeedbackComponent
  ]
})
export class SharedModule {
}
