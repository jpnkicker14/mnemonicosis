import {CardValue} from './enums/card-value.enum';
import {Suit} from './enums/suit.enum';
import {NaturalEnum} from './enums/natural.enum';

export interface CardDef {
  value: CardValue;
  suit: Suit;
  naturals?: Array<NaturalEnum>;
}
