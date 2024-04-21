import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, retry} from "rxjs";
import {JobOffer} from "../models/job-offer";
import {environment} from "../../environment/environment";
import {PaginationFilter} from "../models/pagination-filter";
import {Injectable} from "@angular/core";
import {PaginationResponse} from "../models/pagination-response";
import {JobOfferInfo} from "../models/job-offer-info";
import {PostJobOffer} from "../models/post-job-offer";
import {JobOfferRequests} from "../models/job-offer-requests";
import {VolunteersRequests} from "../models/volunteers-requests";

@Injectable({
  providedIn: 'root',
})

export class JobOfferService {

  constructor(private readonly http: HttpClient) {}

  createJobOffer(jobOfferObj : JobOfferInfo){
    return this.http
      .post(environment.apiAddress + "/JobOffer/createJobOffer", jobOfferObj);
  }

  getJobOfferInfo(id : string): Observable<PostJobOffer> {
    return this.http
      .get<PostJobOffer>(environment.apiAddress + `/JobOffer/${id}`)
  }

  getAllJobOffers(paginationFilter: PaginationFilter): Observable<PaginationResponse<JobOffer[]>>{

    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc')
      .set('SearchCriteria', paginationFilter.searchCriteria);

    return this.http.get<PaginationResponse<JobOffer[]>>(environment.apiAddress + "/JobOffer/getAllJobOffers", { params: params });
  }

  getJobOfferRequests(paginationFilter: PaginationFilter) : Observable<PaginationResponse<JobOfferRequests[]>> {
    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc');

    return this.http
      .get<PaginationResponse<JobOfferRequests[]>>(
        environment.apiAddress + "/JobOffer/getJobOfferRequests",
        { params: params}
      );
  }

  getRequestsFromVolunteers(paginationFilter: PaginationFilter): Observable<PaginationResponse<VolunteersRequests[]>>{
    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc');

    return this.http
      .get<PaginationResponse<VolunteersRequests[]>>(
        environment.apiAddress + "/JobOffer/getRequestsFromVolunteers",
        {params: params}
      );
  }

  getOfferStatus(offerId : string){
    return this.http
      .get(environment.apiAddress + `/JobOffer/getOfferStatus/${offerId}`);
  }

}
