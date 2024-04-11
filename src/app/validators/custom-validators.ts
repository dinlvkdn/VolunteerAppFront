import { FormControl } from "@angular/forms";

export class CustomValidators{
  static noSpaceAllowed (control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed: true}
    }
    return  null;
  }
  static ageValidator(control: FormControl) {
    if (control.value) {
      const birthday = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthday.getFullYear();
      const monthDiff = today.getMonth() - birthday.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
      }
      return age >= 16 ? null : { invalidAge: true };
    }
    return null;
  }
  static maxYearValidator(control: FormControl) {
    const minYear = 1000;
    const currentYear = new Date().getFullYear();
    const yearValue = parseInt(control.value);

    if (control.value && (yearValue < minYear || yearValue > currentYear)) {
      return { maxYearExceeded: true };
    }

    return null;
  }

  static emailValidator(control: FormControl) {
     const emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(control.value) ? null : { invalidEmail: true };
  }

  static validateNonLatinInput(control: FormControl) {
    const inputValue = control.value;
    const nonLatinCharactersRegex = /[^a-zA-Z]/;
    return nonLatinCharactersRegex.test(inputValue) ? { nonLatin: true } : null;
  }

  static dateValidator(control: FormControl) {
    let currentDate = new Date();
    let dateToCheck = new Date(control.value);
    return (dateToCheck.getTime() > currentDate.getTime()) ? null : { dateValidator: true };
  }
}
