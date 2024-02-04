import { AbstractControl, ValidationErrors } from '@angular/forms';

export const numberValidator: (control: AbstractControl) => ValidationErrors | null = (control: AbstractControl):
  ValidationErrors | null => {
  if (!control.value || control.value.length === 0) {
    return null;
  }
  if (typeof control.value !== 'number') {
    return {number: control.value};
  }

  return null;
};
