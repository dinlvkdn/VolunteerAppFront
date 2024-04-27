import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginationFilter} from "../models/pagination-filter";
import {Observable} from "rxjs";
import {PaginationResponse} from "../models/pagination-response";
import {environment} from "../../environment/environment";
import {Organization} from "../models/organization";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) {}

  getAllOrganizations(paginationFilter: PaginationFilter): Observable<PaginationResponse<Organization[]>>{

    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc')

    return this.http.get<PaginationResponse<Organization[]>>(
      environment.apiAddress + "/StatusHistory/getAllOrganizations",
      { params: params });
  }

  deleteOrganization(organizationId : string){
    return this.http
      .delete(environment.apiAddress + `/StatusHistory/deleteOrganization/${organizationId}`)
  }

}
