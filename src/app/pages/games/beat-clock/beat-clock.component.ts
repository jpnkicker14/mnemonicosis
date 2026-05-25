import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CardDisplayEnum } from 'src/app/components/mem-deck-trainer/card-display.enum';
import { Card } from 'src/app/services/stacks/card';
import { DeckFilters } from 'src/app/services/stacks/deck-filters';
import { CardDisplayDetails } from 'src/app/services/stacks/enums/card-display-details.enum';
import { Stack } from 'src/app/services/stacks/stack';
import { StacksService } from 'src/app/services/stacks/stacks.service';
import { Utils } from 'src/app/utils/utils';

type GameState = 'waiting' | 'playing' | 'feedback' | 'ended';
export type Direction = 'card' | 'position';

@Component({
  standalone: false,
  selector: 'app-beat-clock',
  templateUrl: './beat-clock.component.html',
  styleUrls: ['./beat-clock.component.sass']
})
export class BeatClockComponent implements OnInit, OnDestroy {
  readonly CardDisplayDetails = CardDisplayDetails;
  readonly CardDisplayEnum = CardDisplayEnum;

  // Config (chosen before game starts)
  direction: Direction = 'card';   // 'card' = see card, pick position | 'position' = see number, pick card
  timeBudget = 60;                 // total seconds for the round

  // Stack / filters
  stack: Stack;
  deckParams: DeckFilters;
  speech: SpeechSynthesisUtterance;
  isFiltersOpen = true;

  // Game state
  gameState: GameState = 'waiting';
  filteredCards: Card[] = [];
  rounds: Card[][] = [];           // pre-generated option sets, one per card
  queue: Card[] = [];              // shuffled order of cards to show
  position = 0;                    // index into queue
  correctCounter = 0;
  attempted = 0;
  lastAnswerCorrect: boolean | null = null;
  pickedCard: Card | null = null;  // the card the user actually tapped

  // Timer
  timeLeft = 60;
  private timerSub: Subscription | null = null;

  readonly timeBudgetOptions = [30, 60, 90, 120];

  constructor(private stacksService: StacksService, private cdr: ChangeDetectorRef) {
    this.stack = this.stacksService.getSelectedStack();
    this.deckParams = new DeckFilters();
    this.speech = new SpeechSynthesisUtterance();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.stopTimer();
  }

  // Called when filters form is submitted
  onFiltersChanged(stack: Stack, deckParams: DeckFilters): void {
    this.filteredCards = Stack.filterCards(stack?.cards, deckParams);
    this.isFiltersOpen = false;
  }

  startGame(): void {
    if (this.filteredCards.length < 4) return;
    this.position = 0;
    this.correctCounter = 0;
    this.attempted = 0;
    this.lastAnswerCorrect = null;

    // Build a looping shuffled queue
    this.queue = Utils.shuffle([...this.filteredCards]);

    // Pre-generate 4 options per card (the correct card + 3 distractors)
    this.rounds = this.queue.map((card: Card) => {
      const options: Card[] = [];
      while (options.length < 3) {
        const pick = this.filteredCards[Utils.getRand(0, this.filteredCards.length)];
        if (pick.id !== card.id && !options.some(o => o.id === pick.id)) {
          options.push(pick);
        }
      }
      return Utils.shuffle([card, ...options]);
    });

    this.gameState = 'playing';
    this.startTimer();
  }

  answer(card: Card): void {
    if (this.gameState !== 'playing') return;
    this.attempted++;
    this.pickedCard = card;
    this.lastAnswerCorrect = card.id === this.queue[this.position].id;
    if (this.lastAnswerCorrect) this.correctCounter++;
    this.gameState = 'feedback';

    const delay = this.lastAnswerCorrect ? 800 : 1000;
    setTimeout(() => { this.advance(); this.cdr.detectChanges(); }, delay);
  }

  restart(): void {
    this.stopTimer();
    this.isFiltersOpen = true;
    this.gameState = 'waiting';
    this.queue = [];
    this.rounds = [];
    this.position = 0;
    this.correctCounter = 0;
    this.attempted = 0;
    this.lastAnswerCorrect = null;
    this.pickedCard = null;
  }

  get currentCard(): Card {
    return this.queue[this.position];
  }

  get currentOptions(): Card[] {
    return this.rounds[this.position] ?? [];
  }

  get scorePercent(): number {
    return this.attempted > 0
      ? Math.round((this.correctCounter / this.attempted) * 100)
      : 0;
  }

  get timerPercent(): number {
    return (this.timeLeft / this.timeBudget) * 100;
  }

  private advance(): void {
    this.lastAnswerCorrect = null;
    this.pickedCard = null;

    // When we've exhausted the queue, reshuffle and loop
    if (this.position >= this.queue.length - 1) {
      this.queue = Utils.shuffle([...this.filteredCards]);
      this.rounds = this.queue.map((card: Card) => {
        const options: Card[] = [];
        while (options.length < 3) {
          const pick = this.filteredCards[Utils.getRand(0, this.filteredCards.length)];
          if (pick.id !== card.id && !options.some(o => o.id === pick.id)) {
            options.push(pick);
          }
        }
        return Utils.shuffle([card, ...options]);
      });
      this.position = 0;
    } else {
      this.position++;
    }

    this.gameState = 'playing';
  }

  private startTimer(): void {
    this.timeLeft = this.timeBudget;
    this.timerSub = interval(1000).subscribe(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.stopTimer();
        this.gameState = 'ended';
      }
      this.cdr.detectChanges();
    });
  }

  private stopTimer(): void {
    this.timerSub?.unsubscribe();
    this.timerSub = null;
  }
}
