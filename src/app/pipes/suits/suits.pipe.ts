import {Pipe, PipeTransform} from '@angular/core';
import {Suit} from '../../services/stacks/enums/suit.enum';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  standalone: false,
  name: 'suits'
})
export class SuitsPipe implements PipeTransform {

  constructor(private titlecasePipe: TitleCasePipe) {
  }

  transform(value: Suit[]): unknown {
    return value.map((suit) => {
      return this.titlecasePipe.transform(suit);
    });
  }

}
