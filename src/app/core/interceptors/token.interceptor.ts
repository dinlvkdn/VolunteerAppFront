import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import {TokenInfo} from "../models/token-info";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshed = false;
  private tokenRefresh: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    let authRequest = req;

    if (token != null) {
      authRequest = this.addTokenHeader(authRequest, token);
    }

    return next.handle(authRequest).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return this.error401Handle(authRequest, next);
      }

      return throwError(error);
    }));
  }

  private error401Handle(request: HttpRequest<any>, next: HttpHandler) {
    this.isRefreshed = true;
    this.tokenRefresh.next(null);

    const token = localStorage.getItem('accessToken');

    if (token) {
      let tokens: TokenInfo = {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      }
      return this.userService.refreshToken(tokens).pipe(
        switchMap((token: any) => {
          this.isRefreshed = false;

          localStorage.setItem('accessToken', token.accessToken);
          localStorage.setItem('refreshToken', token.refreshToken);
          this.tokenRefresh.next(token.accessToken);

          return next.handle(this.addTokenHeader(request, token.accessToken));
        }),
        catchError((err) => {
          this.isRefreshed = false;
          return throwError(err);
        })
      );
    }
    return this.tokenRefresh.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: any, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
