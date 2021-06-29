import { Pipe, PipeTransform } from '@angular/core';
import {CardValue} from '../../services/stacks/enums/card-value.enum';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'cardValues'
})
export class CardValuesPipe implements PipeTransform {
  constructor(private titlecasePipe: TitleCasePipe) {
  }

  transform(value: Array<CardValue>): unknown {
    return value.map((v: CardValue) => {
      return this.titlecasePipe.transform(CardValue[v]);
    });
  }

}
