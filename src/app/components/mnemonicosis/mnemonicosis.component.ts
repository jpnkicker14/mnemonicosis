import {Component, OnInit} from '@angular/core';
import {NameService} from '../../services/name/name.service';
import {ActivatedRoute, Params} from '@angular/router';
import {StacksService} from '../../services/stacks/stacks.service';
import {Card} from '../../services/stacks/card';
import {Stack} from '../../services/stacks/stack';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Utils} from '../../utils/utils';
import {animate, state, style, transition, trigger} from '@angular/animations';

interface NewCardInfo {
  card: Card,
  name: string // person name
}

@Component({
  selector: 'app-mnemonicosis',
  templateUrl: './mnemonicosis.component.html',
  styleUrls: ['./mnemonicosis.component.sass'],
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
export class MnemonicosisComponent implements OnInit {
  state: "default" | "flipped"
  showImage: boolean;
  alerts: Array<string>;

  newCardSub: BehaviorSubject<NewCardInfo | null>;
  stack$: Observable<Stack | undefined>;
  cardInfo$: Observable<NewCardInfo | null>


  constructor(private route: ActivatedRoute,
              private stacksService: StacksService,
              private nameService: NameService) {
    this.state = 'default';
    this.showImage = false;
    this.alerts = [];
    this.newCardSub = new BehaviorSubject<NewCardInfo | null>(null);
    this.cardInfo$ = this.newCardSub.asObservable();
    this.stack$ = this.route.queryParams
      .pipe(
        map((param: Params) => this.stacksService.getStack(param?.id))
      )
  }

  ngOnInit(): void {

  }

  cardClicked() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  newCardHandler(stack: Stack): void {
    this.alerts = [];
    this.nameService.getName()
      .pipe(take(1))
      .subscribe((name: string) => {
        this.newCardSub.next({
          card: stack.cards[Utils.getRand(0, stack.cards.length - 1)],
          name: name
        })
      });
  }
}
