import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/custom-validators';
import {Login} from "../../core/models/login";
import {catchError, of, Subject, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {StorageService} from "../../core/services/storage.service";
import {ErrorService} from "../../core/services/error.service";

@Component({
  selector: 'app-auth-section',
  templateUrl: './auth-section.component.html',
  styleUrl: './auth-section.component.scss'
})
export class AuthSectionComponent implements OnInit {

  @Input() buttonContent: String | undefined;
  @Input() isVolunteer: boolean | undefined;
  @Input() title: String | undefined;

  signingForm: FormGroup;

  result: Subject<boolean> = new Subject<boolean>();
  private destroyed: Subject<void> = new Subject();

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
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
    if (!this.signingForm.valid) {
      this.snackBar.open('Please fill in all fields!', 'Close');
      return;
    }

    let login: Login = {
      email: this.signingForm.value.email,
      password: this.signingForm.value.password
    };

    this.userService.login(login)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.snackBar.open('Please register your account', 'Close');
            } else if (error.error.title === "Incorrect password!") {
              this.snackBar.open('Incorrect password!', 'Close');
            }
          }
          return of();
        }),
        switchMap((res: any) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          return this.userService.isUserExist()
            .pipe(
              catchError(error => {
                if (error instanceof HttpErrorResponse) {
                  if (error.status === 404) {
                    this.router.navigateByUrl("/add-info")
                    throw Error("");
                  }
                }else if (error.status === 500) {
                  this.snackBar.open('An error occurred, please try again later', 'Close');
                } else {
                  this.snackBar.open('An error occurred, please try again later', 'Close');
                }
                return of(error);
              })
            )
        })
      )
      .subscribe( {
        next: ()=>{
          const userRoles = this.userService.getRole();
          console.log(userRoles)
          if (userRoles) {
            if (userRoles.includes('Organization')) {
              this.router.navigateByUrl("/volunteers")
            } else if (userRoles.includes('Volunteer')) {
              this.router.navigateByUrl("/job-offers")
            }
          }
        },
        error: (error: any) => {
          return of(error);
        }
      })
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.snackBar.open('Not found', 'Close');
    } else if (error.error.title === "Incorrect password!") {
      this.snackBar.open('Incorrect password!', 'Close');
    } else if (error.status === 500) {
      this.snackBar.open('Failed to login', 'Close');
    }
  }

  toggleVolunteer(isVolunteer: boolean) {
    this.isVolunteer = isVolunteer;
  }
}
