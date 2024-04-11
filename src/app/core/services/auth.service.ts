import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Login} from "../models/login";
import {TokenInfo} from "../models/token-info";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {Register} from "../models/register";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login : Login) : Observable<any>{
    return this.http
      .post(
        environment.apiIdentityAddress + "/User/login",
        login,
        httpOptions
      );
  }

  register(register : Register) : Observable<any>{
    return this.http
      .post(
        environment.ngrok + "/User/register",
        register,
        httpOptions
      );
  }
}
