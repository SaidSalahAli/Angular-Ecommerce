import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function existEmailValidator(existEmails: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailVal: string = control.value;
      if (emailVal.length === 0 && control.untouched) {
        return null;
      }
  
      const validationError: ValidationErrors = { 'EmailNotValid': { 'value': emailVal } };
      const foundEmail: boolean = existEmails.includes(emailVal);
      return foundEmail ? null : validationError;
    };
  }