import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Stack} from '../../services/stacks/stack';
import {StacksService} from '../../services/stacks/stacks.service';
import {Card} from '../../services/stacks/card';
import {Utils} from '../../utils/utils';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-accan',
  templateUrl: './accan.component.html',
  styleUrls: ['./accan.component.sass'],
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
export class AccanComponent implements OnInit {
  stack$: Observable<Stack>;
  state: "default" | "flipped"
  disableAnimation: boolean;

  card?: Card;
  number?: number;
  diff?: number;
  cutCard?: Card;

  constructor(private stacksService: StacksService) {
    this.stack$ = this.stacksService.selectSelectedStack();
    this.state = 'default';
    this.disableAnimation = false;
    this.newAcaanHandler(this.stacksService.getSelectedStack());
  }

  get displayNumber(): string {
    return this.getNumberWithOrdinal(this.number ?? 0);
  }

  ngOnInit(): void {
  }

  newAcaanHandler(stack: Stack) {
    this.disableAnimation = true;
    this.state = 'default';
    this.card = stack.cards[Utils.getRand(1, 52)];
    this.number = Utils.getRand(1, 52);
    const cardPosition = this.card.position ?? 0;
    let diff = cardPosition - this.number;
    if (diff < 0) {
      diff += 52
    }
    this.cutCard = stack.cards[diff - 1];
    setTimeout(() => {
      this.disableAnimation = false;
    });
  }

  cardClicked() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  private getNumberWithOrdinal(n: number): string {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
}
