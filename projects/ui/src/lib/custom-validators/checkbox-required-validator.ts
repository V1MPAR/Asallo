import { FormGroup, ValidationErrors } from '@angular/forms';

export function requireCheckboxesToBeCheckedValidator(minRequired: number = 1): ValidationErrors | null {
  return (formGroup: FormGroup) => {
    let checked: number = 0;

    Object.keys(formGroup.controls).forEach(key => {
      const control: any = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireOneCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}
