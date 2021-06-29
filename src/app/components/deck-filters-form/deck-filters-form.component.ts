import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CardDisplayEnum} from '../mem-deck-trainer/card-display.enum';
import {DeckStateEnum} from '../mem-deck-trainer/deck-state.enum';
import {DeckFilters} from '../../services/stacks/deck-filters';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {CardValue} from '../../services/stacks/enums/card-value.enum';
import {Suit} from '../../services/stacks/enums/suit.enum';
import {Card} from '../../services/stacks/card';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {debounceTime, filter} from 'rxjs/operators';
import {CardDisplayDetails} from 'src/app/services/stacks/enums/card-display-details.enum';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control?.dirty && form?.invalid);
  }
}

@UntilDestroy()
@Component({
  selector: 'app-deck-filters-form',
  templateUrl: './deck-filters-form.component.html',
  styleUrls: ['./deck-filters-form.component.sass']
})
export class DeckFiltersFormComponent implements OnInit, AfterViewInit {
  @Input() panelOpenState = true;
  @Input() deckFilters = new DeckFilters();
  @Output() deckFilterChanged = new EventEmitter<DeckFilters>();

  @ViewChild('form') form?: NgForm;

  errorMatcher: CrossFieldErrorMatcher
  values: Array<{ id: CardValue, name: string }>;
  suites: Array<{ id: Suit, name: string }>;
  voices: Array<{ id: string, name: string }>;

  DeckStateEnum = DeckStateEnum;
  CardDisplayEnum = CardDisplayEnum;
  CardDisplayDetails = CardDisplayDetails;

  constructor() {
    this.errorMatcher = new CrossFieldErrorMatcher();
    this.voices = [];
    this.suites = Card.SUITS_LIST
    this.values = Card.VALUE_LIST;

  }

  ngOnInit(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = this.getVoices();
        if (this.voices.length > 0) {
          this.deckFilters.voice = this.voices[0].id;
        }
      };

      this.voices = this.getVoices();
      if (this.voices.length > 0) {
        this.deckFilters.voice = this.voices[0].id;
      }
    }
  }

  ngAfterViewInit() {
    this.form?.valueChanges
      ?.pipe(
        untilDestroyed(this),
        debounceTime(200),
        filter(() => !!this.form?.valid)
      )
      .subscribe((params: DeckFilters) => {
        this.deckFilterChanged.emit(params);
      })
  }

  private getVoices(): Array<{ id: string, name: string }> {
    const langRegex = /^en(-[a-z]{2})?$/i;
    // Get the available voices and filter the list to only have English speakers
    return window.speechSynthesis.getVoices()
      .filter((voice: SpeechSynthesisVoice) => langRegex.test(voice.lang))
      .map((voice: SpeechSynthesisVoice) => {
        return {id: voice.voiceURI, name: voice.name};
      });
  }
}
