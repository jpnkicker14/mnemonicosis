import {Card} from './card';
import {StackGroup} from './enums/stack-group.enum';
import {CardDef} from './card-def';
import {DeckFilters} from './deck-filters';
import {DeckStateEnum} from '../../components/mem-deck-trainer/deck-state.enum';

export class Stack {
  id: string;
  name: string;
  group: StackGroup;
  cards: Array<Card>;

  static filterCards(deck: Array<Card> = [], filters: DeckFilters): Array<Card> {
    let boundStack = deck.slice(filters.start - 1, filters.end) ?? [];
    if(filters.valueIds.length > 0 || filters.suitIds.length > 0) {
      boundStack = boundStack.filter((card: Card) => {
        // if both are provided ensure both requirements are met
        if (filters.valueIds.length > 0 && filters.suitIds.length > 0) {
          return filters.suitIds.includes(card.suit) && filters.valueIds.includes(card.value);
        } else {
          return filters.suitIds.includes(card.suit) || filters.valueIds.includes(card.value);
        }
      });
    }

    boundStack = (filters.shuffle === DeckStateEnum.shuffle) ? Stack.shuffle(boundStack) : boundStack;
    return boundStack;
  }

  public static shuffle(cards: Array<Card>): Array<Card> {
    let currentIndex = cards.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex], cards[currentIndex]];
    }

    return cards;
  }

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
