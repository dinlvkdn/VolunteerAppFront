import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import {VolunteerInfo} from "../../core/models/volunteer-info";
import {VolunteerService} from "../../core/services/volunteer.service";
import {ResumeService} from "../../core/services/resume.service";
import {catchError, finalize, of, switchMap} from "rxjs";
import {OrganizationInfo} from "../../core/models/organization-info";
import {OrganizationService} from "../../core/services/organization.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-info-section',
  templateUrl: './add-info-section.component.html',
  styleUrl: './add-info-section.component.scss'
})

export class AddInfoSectionComponent implements OnInit {
  @Input() isVolunteer: boolean;
  showSpinner: boolean = false;
  public addInfoForm: FormGroup;

  constructor(
    private volunteerService : VolunteerService,
    private resumeService : ResumeService,
    private organizationService : OrganizationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(){
    if (this.isVolunteer){
      this.addInfoForm = new FormGroup({
        firstName : new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed, Validators.pattern("^[a-zA-Z ]{1,15}$")]),
        lastName : new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed,  Validators.pattern("^[a-zA-Z ]{1,15}$")]),
        birthdate : new FormControl(null,[ Validators.required, CustomValidators.ageValidator]),
        description : new FormControl(null, [Validators.required, Validators.pattern("^[\\s\\S]{1,900}$")]),
        resume : new FormControl(null, Validators.required)
      });
    }
    else{
      this.addInfoForm = new FormGroup({
        name : new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]{1,20}$")]),
        year : new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed, CustomValidators.maxYearValidator , Validators.pattern("^[0-9 ]{4}$")]),
        description : new FormControl(null, [Validators.required, Validators.pattern("^[\\s\\S]{1,900}$")]),
      });
    }
  }

  onSubmit() {
    if (this.isVolunteer) {
      if (!this.addInfoForm.valid){
        this.snackBar.open('Please fill in all fields!', 'Close');
      }
      else {
        this.showSpinner = true;
        let volunteerObj: VolunteerInfo = {
          dateOfBirth: this.addInfoForm.value.birthdate,
          description: this.addInfoForm.value.description,
          firstName: this.addInfoForm.value.firstName,
          lastName: this.addInfoForm.value.lastName
        }

        this.volunteerService.addVolunteer(volunteerObj)
          .pipe(
            switchMap((res: any) => {
                return this.resumeService.uploadResume(this.addInfoForm.value.resume)
              }
            ),
            catchError(
              err => {
                return of(err);
              }
            ),
            finalize(() => {
              this.showSpinner = false;
            })
          )
          .subscribe({
            next: value => console.log(value),
            error: err => console.log(err)
          });
      }
    }
    else{
      if (!this.addInfoForm.valid){
        this.snackBar.open('Please fill in all fields!', 'Close');
      }
      else {
        this.showSpinner = true;
        let organizationObj: OrganizationInfo = {
          name: this.addInfoForm.value.name,
          yearOfFoundation: this.addInfoForm.value.year,
          description: this.addInfoForm.value.description
        };
      this.organizationService.addOrganization(organizationObj)
        .pipe(
          catchError(
            err => {
              return of(err);
            }
          ),
          finalize( ()=> {
            this.showSpinner = false;
          })
        )
        .subscribe({
          next: value => console.log(value),
          error: (err) => this.errorHandler(err)
        });
      }
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addInfoForm.value.resume = file;
    }
  }

  errorHandler(error : HttpErrorResponse) {
    if (error.status === 404){
      this.snackBar.open('Not found', 'Close');
    }
    else if (error.error.title === "File already exists"){
      this.snackBar.open('File already exists!', 'Close');
    }
    else if (error.error.title === "Can't upload file"){
      this.snackBar.open('Can\'t upload file!', 'Close');
    }
    else if (error.error.title === "Volunteer already exists"){
      this.snackBar.open('Volunteer already exists!', 'Close');
    }
    else if (error.status === 500) {
      this.snackBar.open('Could not add volunteer', 'Close');
    }
  }
}
