import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobOfferService} from "../../core/services/job-offer.service";
import {PaginationFilter} from "../../core/models/pagination-filter";
import {catchError, map, of, Subject, takeUntil} from "rxjs";
import {PaginationResponse} from "../../core/models/pagination-response";
import {JobOfferRequests} from "../../core/models/job-offer-requests";
import {Router} from "@angular/router";
import {VolunteersRequests} from "../../core/models/volunteers-requests";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../Shared/confirmation-dialog/confirmation-dialog.component";
import {OrganizationService} from "../../core/services/organization.service";
import {RequestForJobOffer} from "../../core/models/requestForJobOffer";
import {ResumeService} from "../../core/services/resume.service";
import {ErrorService} from "../../core/services/error.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DELETE} from "@angular/cdk/keycodes";
import {VolunteerService} from "../../core/services/volunteer.service";
import {JobOffer} from "../../core/models/job-offer";
import {StorageService} from "../../core/services/storage.service";
import {UserService} from "../../core/services/user.service";
import {FeedbackPagination} from "../../core/models/feedback-pagination";

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss'
})
export class PersonalPageComponent implements OnInit, OnDestroy{
  isVolunteer : boolean;
  private destroyed: Subject<void> = new Subject();
  length: number = 0;
  jobOffers: JobOfferRequests[] = [];
  jobOffersForOrganization: JobOffer[] = [];
  volunteers: VolunteersRequests[] = [];
  feedbacks: FeedbackPagination[] = [];
  constructor(
    private router : Router,
    private jobOfferService: JobOfferService,
    private organizationService: OrganizationService,
    private volunteerService : VolunteerService,
    private dialog: MatDialog,
    private resumeService : ResumeService,
    private errorService : ErrorService,
    private snackBar: MatSnackBar,
    private storage: StorageService,
    private userService: UserService
  ) {}

  paginationFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "DateTime",
    sortDirection: 1
  }

  ngOnInit() {
    const userRoles = this.userService.getRole();
    if (userRoles.includes('Organization')) {
      this.isVolunteer = false;
      this.getRequestsFromVolunteers();
      this.getListFeedbacks();
      this.getListJobOffers();
    } else if (userRoles.includes('Volunteer')) {
      this.isVolunteer = true;
      this.getJobOfferRequests();
    }
  }

  getJobOfferRequests(pageIndex: number = 0): void {
    this.paginationFilter.pageNumber = pageIndex;
    this.jobOfferService.getJobOfferRequests(this.paginationFilter)
      .pipe(
        takeUntil(this.destroyed),
        catchError(
          error => {
            this.errorService.handleError(error)
            return of(error);
          }
        )
      )
      .subscribe({
        next: (result: PaginationResponse<JobOfferRequests[]>) => {
          this.jobOffers = result.data;
          this.length = result.totalRecords;
        },
        error: (error: any) => {
          this.errorService.handleError(error);
        }
      });
  }

  openJobOfferPage(id: string) {
    this.router.navigateByUrl(`/job-offer/${id}`);
  }

  openConfirmationDialog(volunteerId: string, jobOfferId : string){
    this.downloadResume(volunteerId);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '50%',
      height: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      const requestForJobOffer : RequestForJobOffer ={
        jobOfferId : jobOfferId,
        volunteerId : volunteerId
      };
      if (result.action === 1 ){
        this.organizationService.confirmVolunteerOnJobOffer(requestForJobOffer)
          .pipe(takeUntil(this.destroyed))
          .subscribe({
            next: () => {
                this.snackBar.open(
                  'Volunteer confirmed successfully.',
                  'Close')
            },
            error: error => {
              this.errorService.handleError(error);
            }
          })
      }
      else if (result.action === 0){
        this.organizationService.cancelVolunteerJobOfferRequest(requestForJobOffer)
          .pipe(takeUntil(this.destroyed))
          .subscribe({
            next: data => {
              console.log("Volunteer canceled successfully.");
            },
            error: error => {
              this.errorService.handleError(error);
            }
          })
      }
    });
  }

  getRequestsFromVolunteers(pageIndex: number = 0): void{
    this.paginationFilter.pageNumber = pageIndex;
    this.jobOfferService.getRequestsFromVolunteers(this.paginationFilter)
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
        next: (result: PaginationResponse<VolunteersRequests[]>) => {
          this.volunteers = result.data;
          this.length = result.totalRecords;
        },
        error: (error: any) => {
          return of(error);
        }
      });
  }

  downloadResume(volunteerId : string) {
    this.resumeService.downloadResume(volunteerId)
      .pipe(
        map(response => new Blob([response], { type: 'application/pdf' })),
        catchError(error => {
          this.errorService.handleError(error);
          return of(null);
        })
      )
      .subscribe((pdf: Blob | null) => {
        if (pdf) {
          const url = window.URL.createObjectURL(pdf);
          const link = document.createElement('a');
          link.href = url;
          link.download = volunteerId;
          link.click();
          window.URL.revokeObjectURL(url);
        }
      });
  }

  deleteAccount(){
    if (this.isVolunteer){
      this.volunteerService.deleteVolunteer()
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
            this.storage.clear()
            this.router.navigateByUrl('/signin')
          },
          error: (error: any) => {
            return of(error);
          }
        });
    }
    else{
      this.organizationService.deleteOrganization()
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
            this.storage.clear()
            this.router.navigateByUrl('/signin')
          },
          error: (error: any) => {
            return of(error);
          }
        });
    }
  }

  logoutAccount(){
    this.storage.clear();
    this.router.navigateByUrl("/signin");
  }
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  feedbacksPaginationFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "DateTime",
    sortDirection: 1,
    organizationId: this.userService.getId()
  }

  getListFeedbacks(pageIndex: number = 0){
    this.paginationFilter.pageNumber = pageIndex;
    this.userService.getId();
    this.organizationService.getListFeedbacks(this.feedbacksPaginationFilter)
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

  selectedStatus: number | null = null;
  filterByStatus(status: number): void {
    this.selectedStatus = status;
  }

  jobOfferFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "DateTime",
    sortDirection: 1,
    organizationId: this.userService.getId()
  }
  getListJobOffers(pageIndex: number = 0): void {
    this.paginationFilter.pageNumber = pageIndex;
    this.organizationService.getGetAllOffersOfTheOrganization(this.jobOfferFilter)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (result: PaginationResponse<JobOffer[]>) => {
          this.jobOffersForOrganization = result.data;
          this.length = result.totalRecords;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }
}
