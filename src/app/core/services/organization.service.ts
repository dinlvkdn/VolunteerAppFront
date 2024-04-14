import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {OrganizationInfo} from "../models/organization-info";
import {environment} from "../../environment/environment";
import {PaginationFilter} from "../models/pagination-filter";
import {Observable} from "rxjs";
import {PaginationResponse} from "../models/pagination-response";
import {JobOffer} from "../models/job-offer";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private readonly http: HttpClient) {}

  addOrganization(organizationObj: OrganizationInfo){
    return this.http
      .post(environment.apiAddress + "/Organization",organizationObj);
  }

  getGetAllOffersOfTheOrganization(paginationFilter: PaginationFilter): Observable<PaginationResponse<JobOffer[]>>{
    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc')
      .set('OrganizationId', paginationFilter.organizationId);

    return this.http.get<PaginationResponse<JobOffer[]>>(environment.apiAddress + "/JobOffer/getAllJobOffers", { params: params });
  }

  getOrganizationById(id: string): Observable<OrganizationInfo>{
    return this.http
    .get<OrganizationInfo>(environment.apiAddress + `/Organization/getOrganization/${id}`)
  }
}
