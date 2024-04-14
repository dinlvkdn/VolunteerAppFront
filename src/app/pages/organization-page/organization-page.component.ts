import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationFilter} from "../../core/models/pagination-filter";
import {Observable, Subject, takeUntil} from "rxjs";
import {PaginationResponse} from "../../core/models/pagination-response";
import {JobOffer} from "../../core/models/job-offer";
import {OrganizationService} from "../../core/services/organization.service";
import {PostJobOffer} from "../../core/models/post-job-offer";
import {OrganizationInfo} from "../../core/models/organization-info";

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.scss'
})
export class OrganizationPageComponent implements OnDestroy{
  private destroyed: Subject<void> = new Subject();
  length: number = 0;
  organizationId : string = '';
  jobOffers: JobOffer[] = [];
  organization$ : Observable<OrganizationInfo>;
  constructor(
    private router: Router,
    private organizationService : OrganizationService,
    private route: ActivatedRoute,
  ) {}

  paginationFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "DateTime",
    sortDirection: 1,
    organizationId: this.organizationId
  }


ngOnInit(){
  this.route.params.subscribe(params =>{
    this.organizationId = params['id'];
  });
  console.log(this.organizationId);
  this.organization$ = this.organizationService.getOrganizationById(this.organizationId);
  this.getListJobOffers();
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
}
