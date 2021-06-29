import {DeckStateEnum} from '../../components/mem-deck-trainer/deck-state.enum';
import {CardDisplayEnum} from '../../components/mem-deck-trainer/card-display.enum';
import {Suit} from './enums/suit.enum';
import {CardValue} from './enums/card-value.enum';
import {CardDisplayDetails} from './enums/card-display-details.enum';

export class DeckFilters {
  constructor(public start = 1,
              public end = 52,
              public shuffle = DeckStateEnum.loop,
              public display = CardDisplayEnum.card,
              public displayDetails = CardDisplayDetails.image,
              public voice = '',
              public suitIds: Array<Suit> = [],
              public valueIds: Array<CardValue> =  []) {
  }
}
