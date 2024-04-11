import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, of, Subject, takeUntil} from "rxjs";
import {JobOffer} from "../models/job-offer";
import {environment} from "../../environment/environment";
import {PaginationFilter} from "../models/pagination-filter";
import {Injectable, OnDestroy} from "@angular/core";
import {PaginationResponse} from "../models/pagination-response";
import { throwError } from 'rxjs';
import {JobOfferInfo} from "../models/job-offer-info";

@Injectable({
  providedIn: 'root',
})

export class JobOfferService {

  constructor(private readonly http: HttpClient) {}

  getAllJobOffers(paginationFilter: PaginationFilter): Observable<PaginationResponse<JobOffer[]>>{

    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc');

    return this.http.get<PaginationResponse<JobOffer[]>>(environment.apiAddress + "/JobOffer/getAllJobOffers", { params: params });
  }

  createJobOffer(jobOfferObj : JobOfferInfo){

    return this.http
      .post(environment.apiAddress + "/JobOffer/createJobOffer", jobOfferObj);
  }
}
