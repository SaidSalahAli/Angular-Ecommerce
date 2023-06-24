import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function existEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailVal: string = control.value;
    
    // If the control is untouched and the email value is empty, return null (no validation error)
    if (emailVal.length === 0 && control.untouched) {
      return null;
    }
    // Create a validation error object with the email value
    const validationError: ValidationErrors = { 'EmailNotValid': { 'value': emailVal } };

    // Check if the email contains the @ symbol
    const hasAtSymbol: boolean = emailVal.includes('@');
    
    // Return the validation error if the email does not have the @ symbol, otherwise return null
    return hasAtSymbol ? null : validationError;
  };
}