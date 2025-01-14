import {Component, OnInit} from '@angular/core';
import {NameService} from '../../services/name/name.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StacksService} from '../../services/stacks/stacks.service';
import {Card} from '../../services/stacks/card';
import {Stack} from '../../services/stacks/stack';
import {BehaviorSubject, Observable, OperatorFunction} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {Utils} from '../../utils/utils';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {SpreadDialogComponent} from '../../components/spread-dialog/spread-dialog.component';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

interface NewCardInfo {
  card: Card,
  name: string // person name
}

@UntilDestroy()
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
  disableAnimation: boolean;
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

  constructor(private router: Router,
              private dialog: MatDialog,
              private breakpointObserver: BreakpointObserver,
              private stacksService: StacksService,
              private nameService: NameService) {
    this.state = 'default';
    this.disableAnimation = false;
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

    this.stack$ = this.stacksService.selectSelectedStack()
      .pipe(
        tap((stack: Stack) => {
          if (stack.isCyclical) {
            this.router.navigate(['/home'], {queryParamsHandling: "merge"})
          }
          this.newCardSub.next(stack.cards[Utils.getRand(0, stack.cards.length - 1)])
        })
      );
  }

  ngOnInit(): void {
    // newCardHandler
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
      .pipe(untilDestroyed(this))
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
    this.disableAnimation = true;
    this.reset();
    this.newCardSub.next(stack.cards[Utils.getRand(0, stack.cards.length - 1)]);
    setTimeout(() => {
      this.disableAnimation = false;
    });
  }

  openSpreadHandler(stack: Stack, selectedCard: Card) {
    this.dialog.open(SpreadDialogComponent, {
      data: {
        cards: stack.cards,
        selectedCardIds: [selectedCard.id]
      },
      width: this.isLtSm ? '100%' : '60%'
    });
  }

  cutCards(stack: Stack, selectedCard: Card, min: number, max: number): void {
    const cards = this.faceDown ? stack.cards : stack.faceUpCards;
    this.cutCard = cards[(Utils.getRand(min, max) - 1)];
    this.cutCardDifference = Math.abs((this.faceDown ? selectedCard.position : selectedCard.bottomPosition) -
      (this.faceDown ? this.cutCard.position : this.cutCard.bottomPosition));
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
