import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobOfferService} from "../../core/services/job-offer.service";
import {catchError, Observable, of} from "rxjs";
import {VolunteerService} from "../../core/services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {PostJobOffer} from "../../core/models/post-job-offer";

@Component({
  selector: 'app-job-offer-page',
  templateUrl: './job-offer-page.component.html',
  styleUrl: './job-offer-page.component.scss'
})
export class JobOfferPageComponent implements OnInit{
  jobOffer$ : Observable<PostJobOffer>;
  offerId : string;
  isButtonDisabled: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobOfferService: JobOfferService,
    private volunteerService: VolunteerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.offerId = params['id'];
    });
    this.jobOffer$ = this.jobOfferService.getJobOfferInfo(this.offerId);
  }

  sendRequest(): void {
    this.isButtonDisabled = true;
     this.volunteerService
       .sendRequestForJobOffer(this.offerId)
       .pipe(
         catchError(
           err => {
             this.errorHandler(err);
             return of(err);
           }
         )
       )
       .subscribe({

         next: value => console.log(value),
         error: err => console.log(err)
       });
  }
  navigateBack() {
    this.router.navigate(['/job-offers']);
  }

  errorHandler(error : HttpErrorResponse) {
    if (error.status === 404){
      this.snackBar.open('Not found', 'Close');
    }
    else if (error.status === 500 || error.status === 400){
      this.snackBar.open('An error occurred, please try again later', 'Close');
    }
    else if (error.status === 200) {
      this.snackBar.open('Successfully sent a request to job offer', 'Close');
    }
  }
}
