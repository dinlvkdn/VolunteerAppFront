import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {StorageService} from "../storage.service";
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class OrganizationVolunteerGuard implements CanActivate{

  constructor(
    private router: Router,
    private storage: StorageService,
    private userService: UserService
  ) { }

  canActivate(): boolean {
    if(this.storage.getToken()){
      const role = this.userService.getRole();
      if (role === "Organization" || role === "Volunteer") {
        return true;
      } else {
        this.router.navigate(['/404']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
