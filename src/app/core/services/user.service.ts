import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Login} from "../models/login";
import {Register} from "../models/register";
import {TokenInfo} from "../models/token-info";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(login : Login){
    return this.http
      .post<TokenInfo>(
        environment.apiIdentityAddress + "/User/login",
        login
      );
  }

  public register(register : Register){
    return this.http
      .post(
        environment.ngrok + "/User/register",
        register
      );
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
