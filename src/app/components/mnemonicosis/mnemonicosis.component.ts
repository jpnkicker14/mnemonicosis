import {Component, OnInit} from '@angular/core';
import {NameService} from '../../services/name/name.service';
import {ActivatedRoute, Params} from '@angular/router';
import {StacksService} from '../../services/stacks/stacks.service';
import {Card} from '../../services/stacks/card';
import {Stack} from '../../services/stacks/stack';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';
import {Utils} from '../../utils/utils';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {SpreadDialogComponent} from '../spread-dialog/spread-dialog.component';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

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
  isLtSm: boolean;
  cutCard: Card | null;
  cutCardPanelOpenState: boolean;
  psychGuess: number | null;
  faceDown: boolean;

  newCardSub: BehaviorSubject<NewCardInfo | null>;
  stack$: Observable<Stack | undefined>;
  cardInfo$: Observable<NewCardInfo | null>


  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private breakpointObserver: BreakpointObserver,
              private stacksService: StacksService,
              private nameService: NameService) {
    this.state = 'default';
    this.showImage = false;
    this.isLtSm = false;
    this.cutCard = null;
    this.cutCardPanelOpenState = false;
    this.psychGuess = null;
    this.faceDown = true;

    this.newCardSub = new BehaviorSubject<NewCardInfo | null>(null);
    this.cardInfo$ = this.newCardSub.asObservable();
    this.stack$ = this.route.queryParams
      .pipe(
        map((param: Params) => this.stacksService.getStack(param?.id))
      )
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
      .subscribe((state: BreakpointState) => {
        this.isLtSm = state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small];
      })
  }

  cardClicked() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  newCardHandler(stack: Stack): void {
    this.state = 'default';
    this.cutCard = null;
    this.psychGuess = null;
    this.nameService.getName()
      .pipe(take(1))
      .subscribe((name: string) => {
        this.newCardSub.next({
          card: stack.cards[Utils.getRand(0, stack.cards.length - 1)],
          name: name
        })
      });
  }

  openSpreadHandler(stack: Stack) {
    this.dialog.open(SpreadDialogComponent, {
      data: {
        cards: stack.cards
      },
      width: this.isLtSm ? '100%' : '60%'
    });
  }

  cutCards(stack: Stack, min: number, max: number): void {
    // todo deck face up
    this.cutCard = stack.cards[(Utils.getRand(min, max) - 1)];
  }

  psychForceHandler(cutCard?: Card | null) {
    // todo deck face up
    this.cardInfo$
      .pipe(
        take(1),
        filter((cardInfo: NewCardInfo | null): cardInfo is NewCardInfo => cardInfo != null),
        map((cardInfo: NewCardInfo) => cardInfo.card)
      )
      .subscribe((card: Card) => {
        const tolerance = Math.abs((card.position ?? 1) - (cutCard?.position ?? 1));
        this.psychGuess = Utils.getRand(1, tolerance + 1);
      })
  }
}
