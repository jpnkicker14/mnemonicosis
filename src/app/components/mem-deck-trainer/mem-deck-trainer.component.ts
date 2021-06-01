import {Component, OnInit, ViewChild} from '@angular/core';
import {Stack} from '../../services/stacks/stack';
import {ActivatedRoute, Params} from '@angular/router';
import {StacksService} from '../../services/stacks/stacks.service';
import {NameService} from '../../services/name/name.service';
import {filter, map} from 'rxjs/operators';
import {DeckStateEnum} from './deck-state.enum';
import {Card} from '../../services/stacks/card';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-mem-deck-trainer',
  templateUrl: './mem-deck-trainer.component.html',
  styleUrls: ['./mem-deck-trainer.component.sass']
})
export class MemDeckTrainerComponent implements OnInit {
  stack: Stack;
  boundStack: Array<Card>;
  deckParams: { start: number, end: number, shuffle: DeckStateEnum };
  focus: number;

  @ViewChild('form') form: NgForm;

  DeckStateEnum = DeckStateEnum;

  constructor(private route: ActivatedRoute,
              private stacksService: StacksService,
              private nameService: NameService) {
    this.deckParams = {start: 1, end: 52, shuffle: DeckStateEnum.loop};
    this.focus = 0;
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        filter((param: Params) => param?.id != null),
        map((param: Params) => this.stacksService.getStack(param?.id)),
        filter((stack: Stack) => stack != null)
      )
      .subscribe((stack: Stack) => {
        this.stack = stack
        this.boundStack = this.stack.stack;
      })

    this.nameService.getName()
      .subscribe((name) => console.log(name));
  }

  update() {
    this.form.resetForm(this.deckParams);
    const boundStack = this.stack.stack.slice(this.deckParams.start - 1, this.deckParams.end);
    if (this.deckParams.shuffle === DeckStateEnum.shuffle) {
      this.boundStack = this.shuffle(boundStack);
    } else {
      this.boundStack = boundStack;
    }
    this.focus = 0;
  }

  leftClickHandler(): void {
    if(this.focus === 0) {
      this.focus = this.boundStack.length - 1;
    } else {
      this.focus--;
    }
  }

  rightClickHandler(): void {
    if (this.focus === this.boundStack.length - 1) {
      this.focus = 0;
    } else {
      this.focus++;
    }
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
