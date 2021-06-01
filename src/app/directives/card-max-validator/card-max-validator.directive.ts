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
  @Input() appCardMaxValidator: number;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const moreThanDeck = control.value > 52;
    const moreThanMin = this.appCardMaxValidator ? control.value > this.appCardMaxValidator : false;
    return (moreThanDeck || moreThanMin) ?  {max: `Should be less than or equal to ${moreThanDeck ? '52': this.appCardMaxValidator}`} :  null
  }

}
