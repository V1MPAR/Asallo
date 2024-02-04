import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export function validateAllFormFields(formGroup: FormGroup | FormArray): void {
  formGroup.markAsTouched();
  Object.keys(formGroup.controls).forEach((field: string) => {
    const control: AbstractControl | null = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    } else if (control instanceof FormArray) {
      validateAllFormFields(control);
    }
  });
}
