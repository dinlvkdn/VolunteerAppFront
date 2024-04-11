import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if(this.userService.isLoggedIn()) {
        let newRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.userService.getToken()}`,
          }
      });
      return next.handle(newRequest);
    }
    return next.handle(req);
  }
}
