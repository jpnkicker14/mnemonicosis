import {Suit} from './suit.enum';
import {CardValue} from './card-value.enum';

export class Card {
  value = CardValue
  suit: Suit
  position?: number;
  isNatural?: boolean;

  constructor(value: CardValue, suit: Suit, position?: number, isNatural = false) {
    this.value = value;
    this.suit = suit;
    this.position = position;
    this.isNatural = isNatural;
  }

  get shortHandValue(): string {
    switch (this.value) {
      case CardValue.ace:
        return 'A';
      case CardValue.king:
        return 'K';
      case CardValue.queen:
        return 'Q';
      case CardValue.jack:
        return 'J';
      default:
        return this.value.toString();
    }
  }

  get htmlSuit(): string {
    switch (this.suit) {
      case Suit.clubs:
        return '&clubs;'
      case Suit.hearts:
        return '&hearts;';
      case Suit.spades:
        return '&spades;';
      case Suit.diamonds:
        return '&diams;';
    }
  }

  get isRed(): boolean {
    return this.suit === Suit.diamonds || this.suit === Suit.hearts;
  }
}
