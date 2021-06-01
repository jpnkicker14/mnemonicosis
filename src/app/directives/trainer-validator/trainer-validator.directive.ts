import {Directive} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appTrainerValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TrainerValidatorDirective,
    multi: true
  }]
})
export class TrainerValidatorDirective {

  constructor() {
  }

  validate(control: FormGroup): ValidationErrors | null {
    if (control.value?.start > control.value?.end) {
      return {illogical: true};
    } else {
      return null;
    }
  }
}
