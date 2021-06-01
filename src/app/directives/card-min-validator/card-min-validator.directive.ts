import {Directive, Input} from '@angular/core';
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
  @Input() appCardMinValidator: number;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const lessThanDeck = control.value < 1;
    const lessThanMax = this.appCardMinValidator ? control.value < this.appCardMinValidator : false;
    return (lessThanDeck || lessThanMax) ?  {max: `Should be more than or equal to ${lessThanDeck ? '1': this.appCardMinValidator}`} :  null
  }
}
