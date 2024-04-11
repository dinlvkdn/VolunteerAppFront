import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrganizationInfo} from "../models/organization-info";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private readonly http: HttpClient) {}

  addOrganization(organizationObj: OrganizationInfo){
    return this.http
      .post(environment.apiAddress + "/Organization",organizationObj);
  }
}
