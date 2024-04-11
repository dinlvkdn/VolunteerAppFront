import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, Subject} from "rxjs";
import {VolunteerInfo} from "../models/volunteer-info";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class VolunteerService{

  constructor(private readonly http: HttpClient) {}

  addVolunteer(volunteerObj : VolunteerInfo) : Observable<VolunteerInfo>{
    return this.http
      .post<VolunteerInfo>(environment.apiAddress + "/Volunteer/addVolunteer", volunteerObj)
  }
}
