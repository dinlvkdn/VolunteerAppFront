import { Component } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {PaginationFilter} from "../../core/models/pagination-filter";
import {Router} from "@angular/router";
import {VolunteerService} from "../../core/services/volunteer.service";
import {PaginationResponse} from "../../core/models/pagination-response";
import {Volunteer} from "../../core/models/volunteer";

@Component({
  selector: 'app-volunteers-page',
  templateUrl: './volunteers-page.component.html',
  styleUrl: './volunteers-page.component.scss'
})
export class VolunteersPageComponent {

  private destroyed: Subject<void> = new Subject();
  length: number = 0;
  volunteers: Volunteer[] = [];

  paginationFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "DateTime",
    sortDirection: 1,
  }

  constructor(
    private volunteerService: VolunteerService,
    private router : Router) {
  }

  ngOnInit(): void {
    this.getListVolunteers();
  }


  getListVolunteers(pageIndex: number = 0) {
    this.paginationFilter.pageNumber = pageIndex;
    this.volunteerService.getAllVolunteers(this.paginationFilter)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (result: PaginationResponse<Volunteer[]>) => {
          this.volunteers = result.data;
          this.length = result.totalRecords;
          console.log(this.volunteers);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }
}
