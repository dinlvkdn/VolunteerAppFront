import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-add-info-page',
  templateUrl: './add-info-page.component.html',
  styleUrl: './add-info-page.component.scss'
})
export class AddInfoPageComponent implements OnInit{
  constructor(private userService: UserService) {}
  isVolunteer: boolean;

  ngOnInit() {
    const userRoles = this.userService.getRole();
    if (userRoles.includes('Organization')) {
      this.isVolunteer = false;
    } else if (userRoles.includes('Volunteer')) {
      this.isVolunteer = true;
    }
  }
}
