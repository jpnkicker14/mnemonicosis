import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appCardMaxValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CardMaxValidatorDirective,
    multi: true
  }]
})
export class CardMaxValidatorDirective {

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const moreThanDeck = control.value > 52;
    return moreThanDeck?  {max: `Should be less than or equal to 52`} :  null
  }

}
