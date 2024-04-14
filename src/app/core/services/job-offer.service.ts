import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, retry} from "rxjs";
import {JobOffer} from "../models/job-offer";
import {environment} from "../../environment/environment";
import {PaginationFilter} from "../models/pagination-filter";
import {Injectable} from "@angular/core";
import {PaginationResponse} from "../models/pagination-response";
import {JobOfferInfo} from "../models/job-offer-info";
import {PostJobOffer} from "../models/post-job-offer";

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

  getJobOfferInfo(id : string): Observable<PostJobOffer> {
    return this.http
      .get<PostJobOffer>(environment.apiAddress + `/JobOffer/${id}`)
  }
}
