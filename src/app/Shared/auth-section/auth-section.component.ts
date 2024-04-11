import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import {Login} from "../../core/models/login";
import {catchError, of, Subject} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
@Component({
  selector: 'app-auth-section',
  templateUrl: './auth-section.component.html',
  styleUrl: './auth-section.component.scss'
})
export class AuthSectionComponent implements OnInit {

  @Input() buttonContent : String | undefined;
  @Input() isVolunteer : boolean | undefined;
  @Input() title : String | undefined ;

  public signingForm: FormGroup;

  result : Subject<boolean> = new Subject<boolean>();
  private destroyed: Subject<void> = new Subject();

  constructor(
    private userService : UserService,
    private router : Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(){
    this.signingForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          CustomValidators.emailValidator,
          CustomValidators.noSpaceAllowed
        ]),
      password: new FormControl(
        null,
        [
          Validators.required,
          CustomValidators.noSpaceAllowed,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&].{8,}$/)
        ])
    });
  }
  onSubmit() {
    if (!this.signingForm.valid){
      this.snackBar.open('Please fill in all fields!', 'Close');
    }
    let login : Login = {
      email : this.signingForm.value.email,
      password : this.signingForm.value.password
    };

    this.userService.login(login)
      .pipe(
        catchError(e =>{
          this.errorHandler(e);
          return of(e);
        })
      )
      .subscribe({
        next: value => {
          localStorage.setItem("access_token", value)
        }
      });
  }

  errorHandler(error : HttpErrorResponse) {
     if (error.status === 404){
        this.snackBar.open('Not found', 'Close');
     }
     else if (error.error.title === "Incorrect password!"){
       this.snackBar.open('Incorrect password!', 'Close');
     }
     else if (error.status === 500) {
       this.snackBar.open('Failed to login', 'Close');
     }
  }

  toggleVolunteer(isVolunteer: boolean) {
    this.isVolunteer = isVolunteer;
  }
}
