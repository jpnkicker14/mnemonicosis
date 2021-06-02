import {Card} from './card';
import {StackGroup} from './enums/stack-group.enum';

export class Stack {
  id: string;
  name: string;
  group: StackGroup;
  cards: Array<Card>;

  constructor(id: string, name: string, group: StackGroup, cards: Array<Card>) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.cards = cards;
  }

  get isCyclical(): boolean {
    return this.group === StackGroup.Cyclical;
  }

  get faceUpCards(): Array<Card> {
    return [...this.cards].reverse();
  }
}
