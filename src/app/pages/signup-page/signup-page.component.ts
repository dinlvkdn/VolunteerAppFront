import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import {Register} from "../../core/models/register";
import {UserService} from "../../core/services/user.service";
import {catchError, of, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {StorageService} from "../../core/services/storage.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  isVolunteer: boolean = true;

  signupForm: FormGroup;

  result : Subject<boolean> = new Subject<boolean>();
  private destroyed: Subject<void> = new Subject();

  constructor(
    private userService : UserService,
    private snackBar: MatSnackBar,
    private storage : StorageService
  ) { }

  ngOnInit(){
    this.signupForm = new FormGroup({
      email : new FormControl(null, [Validators.required, CustomValidators.emailValidator, CustomValidators.noSpaceAllowed]),
      password : new FormControl(
        null,
        [
          Validators.required,
          CustomValidators.noSpaceAllowed,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&].{8,}$/)
        ]),
      role : new FormControl(1)
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      this.snackBar.open('Please fill in all fields!', 'Close');
    } else {
      let register: Register = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        userName: this.signupForm.value.email,
        roleName: this.signupForm.value.role
      }

      this.userService.register(register)
        .pipe(
          catchError(e => {
            this.errorHandler(e);
            return of(e);
          })
        )
        .subscribe({
          next : value => {
            // this.storage.setToken(value);
          }
        });
    }
  }
  errorHandler(error : HttpErrorResponse) {
    if(error.error.title === "User exist") {
      this.snackBar.open('A user with this email already exists', 'Close');
    }
    else if (error.error.title === "Error creating user") {
      this.snackBar.open('Failed to register', 'Close');
    }
    else if (error.status === 500) {
      this.snackBar.open('Failed to register', 'Close');
    }
    else if (error.status === 400) {
      this.snackBar.open('Not found', 'Close');
    }
  }
  toggleVolunteer(roleValue: number) {
    this.isVolunteer = roleValue  === 1;
    this.signupForm.get('role').setValue(roleValue);
    console.log(roleValue);
  }
}
