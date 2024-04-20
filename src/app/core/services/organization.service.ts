import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {OrganizationInfo} from "../models/organization-info";
import {environment} from "../../environment/environment";
import {PaginationFilter} from "../models/pagination-filter";
import {Observable, retry} from "rxjs";
import {PaginationResponse} from "../models/pagination-response";
import {JobOffer} from "../models/job-offer";
import {RequestForJobOffer} from "../models/requestForJobOffer";
import {FeedbackPagination} from "../models/feedback-pagination";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private readonly http: HttpClient) {}

  addOrganization(organizationObj: OrganizationInfo){
    return this.http
      .post(environment.apiAddress + "/Organization",organizationObj);
  }

  updateOrganization(organizationInfo : OrganizationInfo): Observable<OrganizationInfo>{
    return  this.http
      .put<OrganizationInfo>(
        environment.apiAddress + "/Organization",
        organizationInfo
      )
  }

  deleteOrganization(){
    return this.http.delete(
      environment.apiAddress + "/Organization"
    );
  }

  getOrganizationById(id: string): Observable<OrganizationInfo>{
    return this.http
      .get<OrganizationInfo>(environment.apiAddress + `/Organization/GetOrganization/${id}`);
  }

  getGetAllOffersOfTheOrganization(paginationFilter: PaginationFilter): Observable<PaginationResponse<JobOffer[]>>{
    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc')
      .set('OrganizationId', paginationFilter.organizationId);

    return this.http
      .get<PaginationResponse<JobOffer[]>>(
        environment.apiAddress + "/JobOffer/getAllJobOffers",
        { params: params });
  }

  getListFeedbacks(paginationFilter: PaginationFilter): Observable<FeedbackPagination>{
    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc')
      .set('OrganizationId', paginationFilter.organizationId);

    return this.http
      .get<FeedbackPagination>(
        environment.apiAddress + "/Organization/GetListFeedbacks",
        {
          params
        }
      );
  }

  confirmVolunteerOnJobOffer(requestForJobOffer:RequestForJobOffer){
    console.log("result");
    return this.http
      .put<boolean>(
        environment.apiAddress + "/Organization/confirmVolunteerOnJobOffer",
        requestForJobOffer );

  }

  cancelVolunteerJobOfferRequest(requestForJobOffer:RequestForJobOffer){
    return this.http
      .put<boolean>(
        environment.apiAddress + "/Organization/cancelVolunteerJobOfferRequest",
        requestForJobOffer
      );
  }
}
