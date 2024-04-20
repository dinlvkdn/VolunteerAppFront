import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: HttpErrorResponse): void {
    if (error.error.title === "User exist") {
      this.snackBar.open('A user with this email already exists', 'Close');
    }
    else if (error.error.title === "Error creating user") {
      this.snackBar.open('Failed to register', 'Close');
    }
    else if (error.status === 400){
      this.snackBar.open('An error occurred, please try again later', 'Close');
    }
    else if (error.status === 404) {
      this.snackBar.open('Not found', 'Close');
    }
    else if (error.status === 500){
      this.snackBar.open('An error occurred, please try again later', 'Close');
    }
    else if(error.error.title === 'Error occured while finding resume'){
      this.snackBar.open('Error occured while finding resume')
    }
  }
}
