import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobOfferService} from "../../core/services/job-offer.service";
import {PaginationFilter} from "../../core/models/pagination-filter";
import {JobOffer} from "../../core/models/job-offer";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {PaginationResponse} from "../../core/models/pagination-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-job-offers-page',
  templateUrl: './job-offers-page.component.html',
  styleUrl: './job-offers-page.component.scss'
})

export class JobOffersPageComponent implements OnInit, OnDestroy {
  private readonly searchSubject = new Subject<string | undefined>();
  private destroyed: Subject<void> = new Subject();
  length: number = 0;
  jobOffers: JobOffer[] = [];

  paginationFilter: PaginationFilter = {
    searchCriteria:'',
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "DateTime",
    sortDirection: 1
  }

  constructor(
    private jobOfferService: JobOfferService,
    private router : Router) {
  }

  ngOnInit(): void {
    this.getListJobOffers();
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(searchQuery => {
        this.paginationFilter.searchCriteria = searchQuery;
        this.getListJobOffers();
      });
  }

  getListJobOffers(pageIndex: number = 0): void {
    this.paginationFilter.pageNumber = pageIndex;
    this.jobOfferService.getAllJobOffers(this.paginationFilter)
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

  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  openJobOfferPage(id: string) {
    this.router.navigateByUrl(`/job-offer/${id}`);
  }
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
