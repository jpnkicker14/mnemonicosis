import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Stack} from '../../services/stacks/stack';
import {StacksService} from '../../services/stacks/stacks.service';
import {DeckStateEnum} from './deck-state.enum';
import {Card} from '../../services/stacks/card';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {CardDisplayEnum} from './card-display.enum';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ErrorStateMatcher} from '@angular/material/core';
import {Suit} from '../../services/stacks/enums/suit.enum';
import {CardValue} from '../../services/stacks/enums/card-value.enum';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {debounce, debounceTime, filter} from 'rxjs/operators';
import {DeckFilters} from '../../services/stacks/deck-filters';
import {CardDisplayDetails} from '../../services/stacks/enums/card-display-details.enum';

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
export class MemDeckTrainerComponent implements OnInit, OnChanges {
  @Input() stack?: Stack;

  boundStack: Array<Card>;
  deckParams: DeckFilters
  focus: number;
  state: "default" | "flipped"
  showImage: boolean;
  disableAnimation: boolean;

  speech: SpeechSynthesisUtterance;

  CardDisplayDetails = CardDisplayDetails;

  constructor() {
    this.boundStack = [];
    this.deckParams = new DeckFilters();
    this.state = 'default';
    this.focus = 0;
    this.showImage = true;
    this.disableAnimation = false;

    this.speech = new SpeechSynthesisUtterance();
  }

  ngOnInit() {
    if ('speechSynthesis' in window) {
      this.speech = new SpeechSynthesisUtterance();
      this.speech.lang = 'en';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.stack?.currentValue != null) {
      this.boundStack = changes.stack.currentValue.cards;
    }
  }


  update(stack: Stack, deckParams: DeckFilters) {
    this.boundStack = Stack.filterCards(this.stack?.cards, deckParams);
    this.state = (deckParams.display === CardDisplayEnum.card) ? 'default' : 'flipped';
    if(deckParams.voice) {
      this.speech.voice = window.speechSynthesis.getVoices()
        .filter((voice: SpeechSynthesisVoice) => voice.voiceURI === deckParams.voice)[0];
    }
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

  playSound(): void {
    this.speech.text = `${this.boundStack[this.focus].wordValue} of ${this.boundStack[this.focus].suit}`;
    window.speechSynthesis.speak(this.speech);
  }
}
