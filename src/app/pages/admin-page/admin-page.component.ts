import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {JobOffer} from "../../core/models/job-offer";
import {Organization} from "../../core/models/organization";
import {PaginationFilter} from "../../core/models/pagination-filter";
import {Router} from "@angular/router";
import {PaginationResponse} from "../../core/models/pagination-response";
import {AdminService} from "../../core/services/admin.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit, OnDestroy{

  private destroyed: Subject<void> = new Subject();
  organizations: Organization[] = [];
  length: number = 0;

  paginationFilter: PaginationFilter = {
    searchCriteria:'',
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "DateTime",
    sortDirection: 1
  }

  constructor(
    private router : Router,
    private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getListOrganizations();
  }

  getListOrganizations(pageIndex: number = 0){
    this.paginationFilter.pageNumber = pageIndex;
    this.adminService.getAllOrganizations(this.paginationFilter)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (result: PaginationResponse<Organization[]>) => {
          this.organizations = result.data;
          this.length = result.totalRecords;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }
  openOrganizationPage(id: string) {
    this.router.navigateByUrl(`/organization/${id}`);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
