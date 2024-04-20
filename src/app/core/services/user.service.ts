import { Injectable } from '@angular/core';
import {Login} from "../models/login";
import {Register} from "../models/register";
import {TokenInfo} from "../models/token-info";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private tokenKey = 'accessToken';

  constructor(
    private http: HttpClient
  ) { }

  public login(login : Login){
    return this.http
      .post<TokenInfo>(
        environment.apiIdentityAddress + "/User/login",
        login
      );
  }

  public refreshToken(tokenInfo : TokenInfo){
    return this.http.post(
      environment.apiIdentityAddress + "/User/token",
      tokenInfo
    );
  }

  public register(register : Register){
    return this.http
      .post(
        environment.apiIdentityAddress + "/User/register",
        register
      );
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getRole(){
    var token = localStorage.getItem(this.tokenKey);
    let jwtData = token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    return decodedJwtData.role;
  }

  public isUserExist(){
    return this.http.get(environment.apiAddress + "/User");
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
