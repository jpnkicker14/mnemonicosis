import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Stack} from '../../services/stacks/stack';
import {StacksService} from '../../services/stacks/stacks.service';
import {Observable} from 'rxjs';
import {CardValue} from '../../services/stacks/enums/card-value.enum';
import {Suit} from '../../services/stacks/enums/suit.enum';
import {Card} from '../../services/stacks/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  stack$: Observable<Stack>;
  valueId: string | null;
  suitId: string | null;
  values: Array<{ id: string, name: string }>;
  suites: Array<{ id: string, name: string }>;
  selectedCardIds: Array<string>;
  positions: Array<number>;

  constructor(private cd: ChangeDetectorRef,
              private stacksService: StacksService) {
    this.stack$ = this.stacksService.selectSelectedStack();
    this.valueId = null;
    this.suitId = null;
    this.selectedCardIds = [];
    this.positions = [];

    this.values = [];
    Object.keys(CardValue)
      .filter((key: string) => isNaN(Number(key)))
      .forEach((key: string) => {
        this.values.push({
          id: key,
          name: key
        });
      })

    this.suites = Object.keys(Suit).map((key: string) => {
      return {
        id: key,
        name: key
      }
    })
  }

  ngOnInit(): void {
  }

  valueChangeHandler(cards: Array<Card>, valueId: string) {
    this.valueId = valueId;
    this.updateLocations(cards, valueId, this.suitId);
  }

  suitChangeHandler(cards: Array<Card>, suitId: string) {
    this.suitId = suitId;
    this.updateLocations(cards, this.valueId, this.suitId);
  }

  clear(): void {
    this.valueId = null;
    this.suitId = null;
    this.selectedCardIds = [];
    this.positions = [];
  }

  private updateLocations(cards: Array<Card>, valueId?: string | null, suitId?: string | null): void {
    this.selectedCardIds = [];
    this.positions = [];
    if(valueId != null || suitId != null) {
      cards.forEach((card: Card) => {
        // if both are provided ensure both requirements are met
        if(valueId != null && suitId != null) {
          if(card.wordValue === valueId && card.suit === suitId) {
            this.selectedCardIds.push(card.id);
            this.positions.push(card.position);
          }
        } else {
          if(card.wordValue === valueId) {
            this.selectedCardIds.push(card.id);
            this.positions.push(card.position);
          } else if(card.suit === suitId) {
            this.selectedCardIds.push(card.id);
            this.positions.push(card.position);
          }
        }
      });
    }
  }

}
