import {Attribute, Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appCardMinValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CardMinValidatorDirective,
    multi: true
  }]
})
export class CardMinValidatorDirective {

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const lessThanDeck = control.value < 1;
    return lessThanDeck ?  {max: `Should be more than or equal to 1`} :  null
  }
}
