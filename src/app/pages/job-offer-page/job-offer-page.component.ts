import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobOfferService} from "../../core/services/job-offer.service";
import {catchError, Observable, of} from "rxjs";
import {VolunteerService} from "../../core/services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {PostJobOffer} from "../../core/models/post-job-offer";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-job-offer-page',
  templateUrl: './job-offer-page.component.html',
  styleUrl: './job-offer-page.component.scss'
})
export class JobOfferPageComponent implements OnInit{
  isVolunteer : boolean = true;
  jobOffer$ : Observable<PostJobOffer>;
  offerId : string;
  isButtonDisabled: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobOfferService: JobOfferService,
    private volunteerService: VolunteerService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.offerId = params['id'];
    });
    this.jobOffer$ = this.jobOfferService.getJobOfferInfo(this.offerId);
    const userRoles = this.userService.getRole();
    if (userRoles.includes('Organization')) {
      this.isVolunteer = false;
    }
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

         next: () => {
           this.snackBar.open('Successfully sent a request to job offer', 'Close');
         },
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
  }

  deleteJobOffer() {
    this.jobOfferService
      .deleteJobOffer(this.offerId)
      .pipe(
        catchError(
          err => {
            this.errorHandler(err);
            return of(err);
          }
        )
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Successfully sent a request to job offer', 'Close')
        },
        error: () => {
          this.snackBar.open('Failed to delete job offer', 'Close')
        }
      });
  }
}
