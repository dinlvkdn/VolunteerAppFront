import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/custom-validators";
import {JobOfferService} from "../../core/services/job-offer.service";
import {JobOfferInfo} from "../../core/models/job-offer-info";
import {catchError, finalize, of, Subject, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-job-offer',
  templateUrl: './add-job-offer.component.html',
  styleUrl: './add-job-offer.component.scss'
})
export class AddJobOfferComponent implements OnInit, OnDestroy{
  addJobOffer: FormGroup;
  result : Subject<boolean> = new Subject<boolean>();
  private destroyed: Subject<void> = new Subject();
  showSpinner: boolean = false;
  isButtonDisabled: boolean;
  constructor(
    private jobOfferService: JobOfferService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.addJobOffer = new FormGroup(
      {
        title: new FormControl(null, [Validators.required, Validators.pattern("^.{1,30}$")]),
        country: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]{1,20}$")]),
        city: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]{1,20}$")]),
        street: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]{1,20}$")]),
        date: new FormControl(null, [Validators.required, CustomValidators.dateValidator]),
        description: new FormControl(null, [Validators.required, Validators.pattern("^[\\s\\S]{1,2500}$")])
      });
  }

  onSubmit() {
    if (!this.addJobOffer.valid){
      this.snackBar.open('Please fill in all fields!', 'Close');
    }
    else {
      this.isButtonDisabled = true;
      this.showSpinner = true;
      let jobOfferObj: JobOfferInfo = {
        jobOfferTitle: this.addJobOffer.value.title,
        jobOfferCountry: this.addJobOffer.value.country,
        jobOfferStreet: this.addJobOffer.value.street,
        dateTime: this.addJobOffer.value.date,
        jobOfferCity: this.addJobOffer.value.city,
        description: this.addJobOffer.value.description
      };

      this.jobOfferService.createJobOffer(jobOfferObj)
        .pipe(
          catchError(e => {
            this.result.next(false)
            this.errorHandler(e);
            return of(e);
          }),
          finalize(() => {
            this.showSpinner = false;
          })
        )
        .pipe(takeUntil(this.destroyed))
        .subscribe({
          next: value => {
            console.log(value);
            this.snackBar.open('The job offer was added successfully', 'Close')
          }
        });
    }
  }

  errorHandler(error : HttpErrorResponse) {
    if (error.status === 404){
      this.snackBar.open('Not found', 'Close');
    }
    else if (error.status === 500 || 400) {
      this.snackBar.open('An error occurred, please try again later!', 'Close');
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
