import { Pipe, PipeTransform } from '@angular/core';
import {CardValue} from '../../services/stacks/enums/card-value.enum';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  standalone: false,
  name: 'cardValues'
})
export class CardValuesPipe implements PipeTransform {
  constructor(private titlecasePipe: TitleCasePipe) {
  }

  transform(value: CardValue[]): unknown {
    return value.map((v: CardValue) => {
      return this.titlecasePipe.transform(CardValue[v]);
    });
  }

}
