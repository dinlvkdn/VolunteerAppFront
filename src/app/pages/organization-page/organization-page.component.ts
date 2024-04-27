import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationFilter} from "../../core/models/pagination-filter";
import {catchError, finalize, Observable, of, Subject, takeUntil} from "rxjs";
import {PaginationResponse} from "../../core/models/pagination-response";
import {JobOffer} from "../../core/models/job-offer";
import {OrganizationService} from "../../core/services/organization.service";
import {OrganizationInfo} from "../../core/models/organization-info";
import {VolunteerService} from "../../core/services/volunteer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Feedback} from "../../core/models/feedback";
import {ErrorService} from "../../core/services/error.service";
import {FeedbackPagination} from "../../core/models/feedback-pagination";
import {UserService} from "../../core/services/user.service";
import {AdminService} from "../../core/services/admin.service";

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.scss'
})
export class OrganizationPageComponent implements OnDestroy, OnInit{
  private destroyed: Subject<void> = new Subject();
  isAdmin: boolean = false;
  showSpinner: boolean = false;
  volunteerIsMember: boolean;
  length: number = 0;
  organizationId : string = '';
  jobOffers: JobOffer[] = [];
  feedbacks: FeedbackPagination[] = [];
  organization$ : Observable<OrganizationInfo>;
  paginationFilter: PaginationFilter;
  public addFeedbackForm: FormGroup;

  constructor(
    private router: Router,
    private organizationService : OrganizationService,
    private route: ActivatedRoute,
    private volunteerService : VolunteerService,
    private snackBar: MatSnackBar,
    private errorService: ErrorService,
    private userService: UserService,
    private adminService: AdminService
  ) {}

ngOnInit(){
  this.route.params.subscribe(params =>{
    this.organizationId = params['id'];
  });

  this.paginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "DateTime",
    sortDirection: 1,
    organizationId: this.organizationId
  }
  this.organization$ = this.organizationService.getOrganizationById(this.organizationId);
  this.getListJobOffers();
  this.isMember();
  this.getListFeedbacks();


  const userRoles = this.userService.getRole();
  if (userRoles.includes('Admin')) {
    this.isAdmin = true;
  }
}
  getListJobOffers(pageIndex: number = 0): void {
    this.paginationFilter.pageNumber = pageIndex;
    this.organizationService.getGetAllOffersOfTheOrganization(this.paginationFilter)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (result: PaginationResponse<JobOffer[]>) => {
          this.jobOffers = result.data;
          this.length = result.totalRecords;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }

  openJobOfferPage(id: string) {
    this.router.navigateByUrl(`/job-offer/${id}`);
  }

  navigateBack() {
    this.router.navigate(['/job-offer/']);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  isMember(){
    this.volunteerService.isMember(this.organizationId)
      .subscribe({
      next: (result) => {
        this.volunteerIsMember = result === true;
      },
      error: (error) => {
        return of(error);
      }
    });
    this.addFeedbackForm = new FormGroup({
      rating : new FormControl(1, [Validators.required]),
      comment : new FormControl(null, [Validators.required, Validators.pattern("^[\\s\\S]{1,1500}$")])
    });
  }

  setRating(event : number){
    this.addFeedbackForm.get('rating').setValue(event);
  }

  onSubmit() {
    if (!this.addFeedbackForm.valid){
      this.snackBar.open('Please fill in all fields!', 'Close');
    }
    else {
      this.showSpinner = true;
      let feedback: Feedback = {
        rating: this.addFeedbackForm.value.rating,
        comment: this.addFeedbackForm.value.comment,
        organizationId: this.organizationId
      }

      this.volunteerService.addFeedback(feedback)
        .pipe(
          catchError(
            err => {
              return of();
            }
          ),
          finalize(() => {
            this.showSpinner = false;
          })
        )
        .subscribe({
          next: () => {
            this.getListFeedbacks();
            this.addFeedbackForm.reset();
            this.snackBar.open('Feedback added successfully', 'Close')
          },
          error: err => {
            return of(err);
          }
        });
    }
  }

  getListFeedbacks(pageIndex: number = 0){
    this.paginationFilter.pageNumber = pageIndex;
    this.organizationService.getListFeedbacks(this.paginationFilter)
      .pipe(
        takeUntil(this.destroyed),
        catchError(
          error => {
            this.errorService.handleError(error);
            return of(error);
          }
        )
      )
      .subscribe({
        next: (result: PaginationResponse<FeedbackPagination[]>) => {
          this.feedbacks = result.data;
          this.length = result.totalRecords;
        },
        error: (error: any) => {
          return of(error);
        }
      });
  }

  deleteOrganization(){
    this.adminService.deleteOrganization(this.organizationId)
      .pipe(
        catchError(error => {
          if (error.status === 500){
            this.snackBar.open('An error occurred, please try again later', 'Close');
          }
          return of(error);
        })
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/admin')
        },
        error: (error: any) => {
          return of(error);
        }
      });
  }
}
