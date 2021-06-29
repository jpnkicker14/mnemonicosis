import {Suit} from './enums/suit.enum';
import {CardValue} from './enums/card-value.enum';
import {NaturalEnum} from './enums/natural.enum';

export class Card {
  public static SUITS_LIST: Array<{ id: Suit, name: string }> =
    [
      {id: Suit.clubs, name: 'Clubs'},
      {id: Suit.hearts, name: 'Hearts'},
      {id: Suit.spades, name: 'Spades'},
      {id: Suit.diamonds, name: 'Diamonds'},
    ];

  public static VALUE_LIST: Array<{ id: CardValue, name: string }> =
    [
      {id: CardValue.ace, name: 'Ace'},
      {id: CardValue.two, name: 'Two'},
      {id: CardValue.three, name: 'Three'},
      {id: CardValue.four, name: 'Four'},
      {id: CardValue.five, name: 'Five'},
      {id: CardValue.six, name: 'Six'},
      {id: CardValue.seven, name: 'Seven'},
      {id: CardValue.eight, name: 'Eight'},
      {id: CardValue.nine, name: 'Nine'},
      {id: CardValue.ten, name: 'Ten'},
      {id: CardValue.jack, name: 'Jack'},
      {id: CardValue.queen, name: 'Queen'},
      {id: CardValue.king, name: 'King'}
    ];

  value: CardValue
  suit: Suit
  position: number;
  naturals: Array<NaturalEnum>
  id: string;

  constructor(value: CardValue, suit: Suit, position: number, naturals?: Array<NaturalEnum>) {
    this.id = value + suit;
    this.value = value;
    this.suit = suit;
    this.position = position;
    this.naturals = naturals ?? [];
  }

  get bottomPosition(): number {
    return 53 - this.position;
  }

  get isNatural(): boolean {
    return this.naturals.length > 0;
  }

  get wordValue(): string {
    return CardValue[this.value];
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

  get shortHandSuit(): string {
    switch (this.suit) {
      case Suit.clubs:
        return 'C';
      case Suit.hearts:
        return 'H';
      case Suit.spades:
        return 'S';
      case Suit.diamonds:
        return 'D';
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

  get imageUrl(): string {
    return `assets/imgs/cards_png/${this.shortHandValue}${this.shortHandSuit}.png`
  }
}
