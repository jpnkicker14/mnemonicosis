import {Component, OnInit} from '@angular/core';
import {NameService} from '../../services/name/name.service';
import {ActivatedRoute, Params} from '@angular/router';
import {StacksService} from '../../services/stacks/stacks.service';
import {Card} from '../../services/stacks/card';
import {Stack} from '../../services/stacks/stack';
import {BehaviorSubject, combineLatest, Observable, OperatorFunction} from 'rxjs';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
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
  cutCardDifference: number;

  newCardSub: BehaviorSubject<Card | null>;
  stack$: Observable<Stack>;
  cardInfo$: Observable<NewCardInfo>

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
    this.cutCardDifference = 0;

    this.newCardSub = new BehaviorSubject<Card | null>(null);
    this.cardInfo$ = this.newCardSub.asObservable()
      .pipe(
        switchMap((card: Card | null) => {
          return this.nameService.getName()
            .pipe(
              map((name: string) => {
                return {
                  card: card,
                  name: name
                } as NewCardInfo
              })
            )
        })
      );

    this.stack$ = this.route.queryParams
      .pipe(
        map((param: Params) => this.stacksService.getStack(param?.id)),
        filter((stack: Stack | undefined) => stack != null) as OperatorFunction<Stack | undefined, Stack>,
        tap((stack: Stack) => {
          this.newCardSub.next(stack.cards[Utils.getRand(0, stack.cards.length - 1)])
        })
      )
  }

  ngOnInit(): void {
    // newCardHandler
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
    this.reset();
    this.newCardSub.next(stack.cards[Utils.getRand(0, stack.cards.length - 1)])
  }

  openSpreadHandler(stack: Stack, selectedCard: Card) {
    this.dialog.open(SpreadDialogComponent, {
      data: {
        cards: stack.cards,
        selectedCardId: selectedCard.id
      },
      width: this.isLtSm ? '100%' : '60%'
    });
  }

  cutCards(stack: Stack, selectedCard: Card, min: number, max: number): void {
    const cards = this.faceDown ? stack.cards : stack.faceUpCards;
    this.cutCard = cards[(Utils.getRand(min, max) - 1)];
    this.cutCardDifference = Math.abs(((this.faceDown ? selectedCard?.position : selectedCard?.bottomPosition) ?? 0) -
      ((this.faceDown ? this.cutCard?.position : this.cutCard?.bottomPosition) ?? 0));
  }

  psychForceHandler(selectedCard: Card, cutCard?: Card | null) {
    const selectedCardPosition = this.faceDown ? (selectedCard.position ?? 1) : (selectedCard.bottomPosition ?? 52);
    const cutCardPosition = this.faceDown ? (cutCard?.position ?? 1) : (cutCard?.bottomPosition ?? 52)
    const tolerance = Math.abs(selectedCardPosition - cutCardPosition);
    this.psychGuess = Utils.getRand(1, tolerance + 1);
  }

  deckOrientationHandler(faceDown: boolean): void {
    this.reset();
    this.faceDown = faceDown;
  }

  private reset(): void {
    this.cutCard = null;
    this.psychGuess = null;
    this.cutCardDifference = 0;
  }
}
