import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(complexPassword: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nameControl = control.get("fullName");
    const passControl = control.get("password");
    const confirmPassControl = control.get("confirmPassword");

    if (!passControl || !confirmPassControl || !passControl.value || !confirmPassControl.value) {
      return null;
    }
    if (!complexPassword && nameControl && nameControl.value && passControl.value.includes(nameControl.value)) {
      return { passwordContainsName: true };
    }


    const valErr = { 'UnmatchedPassword': { 'pass': passControl.value, 'confirmPassword': confirmPassControl.value } };
    return (passControl.value === confirmPassControl.value) ? null : valErr;
  };
}