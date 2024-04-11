import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../models/login";
import {TokenInfo} from "../models/token-info";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl: string = `${environment.apiIdentityAddress}/Authenticate`;

  constructor(private readonly httpClient: HttpClient,
              private readonly storageService: StorageService) {
  }

  public logIn(userlogin: Login): Observable<TokenInfo> {

    return this.httpClient.post<TokenInfo>(`${this.apiUrl}/login`, userlogin);
  }

  public refreshToken(): Observable<TokenInfo> {
    const request = {
      accessToken: this.storageService.getToken(),
      refreshToken: this.storageService.getRefreshToken()
    };

    return this.httpClient.post<TokenInfo>(`${this.apiUrl}/refresh-token`, request);
  }

}
