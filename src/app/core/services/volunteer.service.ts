import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {VolunteerInfo} from "../models/volunteer-info";
import {environment} from "../../environment/environment";
import {PaginationFilter} from "../models/pagination-filter";
import {PaginationResponse} from "../models/pagination-response";
import {Volunteer} from "../models/volunteer";
import {VolunteerShortInfo} from "../models/volunteer-short-info";
import {Feedback} from "../models/feedback";

@Injectable({
  providedIn: 'root'
})

export class VolunteerService{

  constructor(private readonly http: HttpClient) {}

  addVolunteer(volunteerObj : VolunteerInfo) : Observable<VolunteerInfo>{
    return this.http
      .post<VolunteerInfo>(environment.apiAddress + "/Volunteer/addVolunteer", volunteerObj)
  }

  updateVolunteer(volunteerShortInfo : VolunteerShortInfo): Observable<VolunteerShortInfo>{
    return this.http
      .put<VolunteerShortInfo>(
        environment.apiAddress + "/Volunteer",
        volunteerShortInfo
      )
  }

  deleteVolunteer(){
    return this.http.delete(
      environment.apiAddress + "/Volunteer"
    );
  }
  sendRequestForJobOffer(jobOfferId: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post(
      environment.apiAddress + `/Volunteer/sendRequestForJobOffer/${jobOfferId}`,
      httpOptions);
  }

  getAllVolunteers(paginationFilter: PaginationFilter): Observable<PaginationResponse<Volunteer[]>>{
    const params = new HttpParams()
      .set('PageNumber', paginationFilter.pageNumber.toString())
      .set('PageSize', paginationFilter.pageSize.toString())
      .set('SortColumn', paginationFilter.sortColumn)
      .set('SortDirection', (paginationFilter.sortDirection === 1) ? 'asc' : 'desc')
      .set('SearchCriteria', paginationFilter.searchCriteria);

    return this.http
      .get<PaginationResponse<Volunteer[]>>(
        environment.apiAddress + "/Organization/getVolunteers",
        { params: params });
  }

  isMember(organizationId: string){
    return this.http
      .get(environment.apiAddress + `/Volunteer/isMember/${organizationId}`);
  }

  addFeedback(feedback : Feedback){
    return this.http
      .post(environment.apiAddress + "/Volunteer/addFeedback",
        feedback,  {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })});
  }
}
