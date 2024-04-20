import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, of, Subject, takeUntil} from "rxjs";
import {PaginationFilter} from "../../core/models/pagination-filter";
import {Router} from "@angular/router";
import {VolunteerService} from "../../core/services/volunteer.service";
import {PaginationResponse} from "../../core/models/pagination-response";
import {Volunteer} from "../../core/models/volunteer";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorService} from "../../core/services/error.service";

@Component({
  selector: 'app-volunteers-page',
  templateUrl: './volunteers-page.component.html',
  styleUrl: './volunteers-page.component.scss'
})
export class VolunteersPageComponent implements  OnInit, OnDestroy{

  private destroy$: Subject<void> = new Subject();
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
    private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.getListVolunteers();
  }

  getListVolunteers(pageIndex: number = 0) {
    this.paginationFilter.pageNumber = pageIndex;
    this.volunteerService.getAllVolunteers(this.paginationFilter)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        catchError(error => {
          this.errorService.handleError(error);
          return of(error);
        })
      )
      .subscribe({
        next: (result: PaginationResponse<Volunteer[]>) => {
          this.volunteers = result.data;
          this.length = result.totalRecords;
        },
        error: (error: any) => {
          this.errorService.handleError(error);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
