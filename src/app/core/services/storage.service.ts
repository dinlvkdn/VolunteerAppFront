import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly token = 'accessToken';
  private readonly tokenExpiration = 'tokenExpiration';
  private readonly refreshToken = 'refreshToken';
  private readonly currentUserRoles = 'currentUserRoles';
  private readonly initialUserRoles = 'initialUserRoles';

  public clear(): void {
    localStorage.clear();
  }

  public setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshToken, refreshToken);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshToken);
  }

  public removeToken(): void {
    return localStorage.removeItem(this.token);
  }

  public removeRefreshToken(): void {
    return localStorage.removeItem(this.token);
  }

  public setTokenExpiration(tokenExpiration: string): void {
    localStorage.setItem(this.tokenExpiration, tokenExpiration);
  }

  public getTokenExpiration(): string | null {
    return localStorage.getItem(this.tokenExpiration);
  }

  public setCurrentUserRoles(roles: string[]): void {
    localStorage.setItem(this.currentUserRoles, roles.join(','));
  }

  public setInitialRolesRoles(roles: string[]): void {
    localStorage.setItem(this.initialUserRoles, JSON.stringify(roles));
  }


  public getCurrentUserRoles(): string[] | undefined {
    return localStorage.getItem(this.currentUserRoles)?.split(',');
  }

  public getInitialRoles(): string[] {
    return JSON.parse(localStorage.getItem(this.initialUserRoles)  || '{}');
  }

  public checkInitialRoles(): boolean {
    return localStorage.getItem(this.initialUserRoles) !== null;
  }
}
