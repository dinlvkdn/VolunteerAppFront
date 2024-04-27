import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VolunteerService} from "../../core/services/volunteer.service";
import {ErrorService} from "../../core/services/error.service";
import {OrganizationService} from "../../core/services/organization.service";
import {VolunteerShortInfo} from "../../core/models/volunteer-short-info";
import {OrganizationInfo} from "../../core/models/organization-info";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomValidators} from "../../validators/custom-validators";
import {catchError, finalize, of} from "rxjs";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-update-info-section',
  templateUrl: './update-info-section.component.html',
  styleUrl: './update-info-section.component.scss'
})

export class UpdateInfoSectionComponent implements OnInit{
  @Input() isVolunteer: boolean;
  showSpinner: boolean = false;
  updateInfoForm: FormGroup;

  constructor(
    private volunteerService: VolunteerService,
    private organizationService: OrganizationService,
    private errorService: ErrorService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    if (this.isVolunteer){
      this.updateInfoForm = new FormGroup({
        firstName: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed, Validators.pattern("^[a-zA-Z ]{1,15}$")]),
        lastName: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed, Validators.pattern("^[a-zA-Z ]{1,15}$")]),
        description: new FormControl(null, [Validators.required, Validators.pattern("^[\\s\\S]{1,900}$")]),
       });
    }
    else{
      this.updateInfoForm = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]{1,20}$")]),
        year: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed, CustomValidators.maxYearValidator, Validators.pattern("^[0-9 ]{4}$")]),
        description: new FormControl(null, [Validators.required, Validators.pattern("^[\\s\\S]{1,900}$")]),
      });
    }
  }

  onSubmit() {
    if (!this.updateInfoForm.valid) {
      this.snackBar.open('Please fill in all fields!', 'Close');
    } else {
      this.showSpinner = true;
      if (this.isVolunteer){
        let volunteer: VolunteerShortInfo = {
          description: this.updateInfoForm.value.description,
          firstName: this.updateInfoForm.value.firstName,
          lastName: this.updateInfoForm.value.lastName
        }

        this.volunteerService.updateVolunteer(volunteer)
          .pipe(
            catchError(
              error => {
                this.errorService.handleError(error)
                return of(error);
              }
            ),
            finalize(() => {
              this.showSpinner = false;
            })
          )
          .subscribe({
            next: () => {
              this.updateInfoForm.reset(),
                this.snackBar.open(
                  'Data changed successfully',
                  'Close')
            },
            error: (error) => this.errorService.handleError(error)
          });
      }
      else{
        let organization: OrganizationInfo = {
          yearOfFoundation: this.updateInfoForm.value.year,
          name: this.updateInfoForm.value.name,
          description: this.updateInfoForm.value.description
        }
        this.organizationService.updateOrganization(organization)
          .pipe(
            catchError(
              error => {
                this.errorService.handleError(error)
                return of(error);
              }
            ),
            finalize(() => {
              this.showSpinner = false;
            })
          )
          .subscribe({
            next: () => {
              this.snackBar.open(
                'Data changed successfully',
                'Close')
            },
            error: (error) => this.errorService.handleError(error)
          });
      }
    }
  }
}
