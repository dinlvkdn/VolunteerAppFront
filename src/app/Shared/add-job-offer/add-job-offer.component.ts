import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/custom-validators";
import {JobofferService} from "../../core/services/joboffer.service";
import {JobOfferInfo} from "../../core/models/job-offer-info";
import {catchError, finalize, of, Subject, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  constructor(
    private jobOfferService: JobofferService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (!this.addJobOffer.valid){
      this.snackBar.open('Please fill in all fields!', 'Close');
    }
    this.addJobOffer = new FormGroup(
      {
        title: new FormControl(null, [Validators.required, Validators.pattern("^.{1,30}$")]),
        country: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]{1,20}$")]),
        city: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]{1,20}$")]),
        street: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]{1,20}$")]),
        date: new FormControl(null, [Validators.required, CustomValidators.dateValidator]),
        description: new FormControl(null, [Validators.required, Validators.pattern("^[\\s\\S]{1,2500}$")])
      }
    );
  }

  onSubmit() {
    this.showSpinner = true;
    let jobOfferObj : JobOfferInfo = {
      jobOfferTitle: this.addJobOffer.value.title,
      jobOfferCountry: this.addJobOffer.value.country,
      jobOfferStreet: this.addJobOffer.value.street,
      dateTime: this.addJobOffer.value.date,
      jobOfferCity: this.addJobOffer.value.city,
      description: this.addJobOffer.value.description
    };

    this.jobOfferService.createJobOffer(jobOfferObj)
      .pipe(
        catchError(e =>{
          this.result.next(false)
          return of(e);
        }),
        finalize( ()=> {
          this.showSpinner = false;
        })
      )
      .pipe(takeUntil(this.destroyed))
      .subscribe((res: any) => {
        this.result.next(res.message === "job offer created")
      });
  }
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
