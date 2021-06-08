import {Card} from './card';
import {StackGroup} from './enums/stack-group.enum';
import {CardDef} from './card-def';

export class Stack {
  id: string;
  name: string;
  group: StackGroup;
  cards: Array<Card>;

  constructor(id: string, name: string, group: StackGroup, cards: Array<CardDef>) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.cards = cards.map((card: CardDef, index: number) => new Card(card.value, card.suit, index + 1, card.naturals));
  }

  get isCyclical(): boolean {
    return this.group === StackGroup.Cyclical;
  }

  get faceUpCards(): Array<Card> {
    return [...this.cards].reverse();
  }
}
