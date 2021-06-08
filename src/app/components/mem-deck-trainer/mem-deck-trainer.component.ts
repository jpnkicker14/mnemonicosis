import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Stack} from '../../services/stacks/stack';
import {StacksService} from '../../services/stacks/stacks.service';
import {DeckStateEnum} from './deck-state.enum';
import {Card} from '../../services/stacks/card';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {CardDisplayEnum} from './card-display.enum';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control?.dirty && form?.invalid);
  }
}


@Component({
  selector: 'app-mem-deck-trainer',
  templateUrl: './mem-deck-trainer.component.html',
  styleUrls: ['./mem-deck-trainer.component.sass'],
  animations: [
    trigger("cardFlip", [
      state(
        "default",
        style({
          transform: "none"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(180deg)"
        })
      ),
      transition("default => flipped", [animate("400ms")]),
      transition("flipped => default", [animate("400ms")])
    ])
  ]
})
export class MemDeckTrainerComponent implements OnChanges {
  @Input() stack?: Stack;


  boundStack: Array<Card>;
  deckParams: { start: number, end: number, shuffle: DeckStateEnum, display: CardDisplayEnum };
  focus: number;
  state: "default" | "flipped"
  showImage: boolean;
  errorMatcher: CrossFieldErrorMatcher
  disableAnimation: boolean;

  @ViewChild('form') form?: NgForm;

  DeckStateEnum = DeckStateEnum;
  CardDisplayEnum = CardDisplayEnum;

  constructor() {
    this.errorMatcher = new CrossFieldErrorMatcher();
    this.boundStack = [];
    this.deckParams = {start: 1, end: 52, shuffle: DeckStateEnum.loop, display: CardDisplayEnum.card};
    this.state = 'default';
    this.focus = 0;
    this.showImage = true;
    this.disableAnimation = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes?.stack?.currentValue != null) {
      this.boundStack = changes.stack.currentValue.cards;
    }
  }


  update(stack: Stack, deckParams: { start: number, end: number, shuffle: DeckStateEnum, display: CardDisplayEnum }) {
    this.form?.resetForm(deckParams);
    const boundStack = stack?.cards.slice(deckParams.start - 1, deckParams.end) ?? [];
    this.boundStack = (deckParams.shuffle === DeckStateEnum.shuffle) ? this.shuffle(boundStack) : boundStack;
    this.state = (deckParams.display === CardDisplayEnum.card) ? 'default' : 'flipped';
    this.focus = 0;
  }

  cardClicked() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  leftClickHandler(): void {
    this.disableAnimation = true;
    this.state = (this.deckParams.display === CardDisplayEnum.card) ? 'default' : 'flipped';
    if (this.focus === 0) {
      this.focus = this.boundStack.length - 1;
    } else {
      this.focus--;
    }
    setTimeout(() => {
      this.disableAnimation = false;
    });
  }

  rightClickHandler(): void {
    this.disableAnimation = true;
    this.state = (this.deckParams.display === CardDisplayEnum.card) ? 'default' : 'flipped';
    if (this.focus === this.boundStack.length - 1) {
      this.focus = 0;
    } else {
      this.focus++;
    }
    setTimeout(() => {
      this.disableAnimation = false;
    });
  }

  private shuffle(cards: Array<Card>): Array<Card> {
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
}
